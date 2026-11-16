#!/usr/bin/env node
// Generic checks for a social-package/1 file. See references/checks.md.
// Usage: node scripts/check-package.mjs [--config docs/social/config.json] [--history <dir>]
//        [--write] [--json] [--hash] [--now <ISO date-time>] <package.json>
// Exit codes: 0 no open blockers, 1 open blockers, 2 usage or read error.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const toolkitDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const DEFAULT_LIMITS = { instagram: 2200, facebook: 10000, threads: 500, bluesky: 300, x: 280, linkedin: 3000, mastodon: 500 };
const DEFAULT_HASHTAGS = {
  instagram: { min: 3, max: 5 }, facebook: { min: 0, max: 2 }, threads: { min: 0, max: 1 }, bluesky: { min: 0, max: 0 },
  x: { min: 0, max: 1 }, linkedin: { min: 0, max: 3 }, mastodon: { min: 0, max: 3 },
};
const LINK_AS_23 = new Set(['x', 'mastodon']);
const LINK_CARD_OR_NONE = new Set(['instagram', 'bluesky']); // no clickable caption link, or a link card instead
const URL_RE = /https?:\/\/[^\s<>()"“”„]+[^\s<>()"“”„.,;:!?]/gu;
const HASHTAG_RE = /(?<![\p{L}\p{N}_])#[\p{L}\p{N}_]+/gu;
const EMOJI_RE = /\p{Extended_Pictographic}/gu;

function usage(message) {
  if (message) console.error(message);
  console.error('Usage: check-package.mjs [--config <config.json>] [--history <dir>] [--write] [--json] [--hash] [--now <ISO>] <package.json>');
  process.exit(2);
}

function parseArgs(argv) {
  const args = { write: false, json: false, hash: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--write') args.write = true;
    else if (a === '--json') args.json = true;
    else if (a === '--hash') args.hash = true;
    else if (a === '--config' || a === '--history' || a === '--now') {
      if (!argv[i + 1]) usage(`${a} needs a value`);
      args[a.slice(2)] = argv[++i];
    } else if (a === '--help' || a === '-h') usage();
    else if (a.startsWith('--')) usage(`Unknown option ${a}`);
    else if (args.package) usage('Only one package at a time');
    else args.package = a;
  }
  if (!args.package) usage('Missing package path');
  return args;
}

function readJson(path, label) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    console.error(`Cannot read ${label} ${path}: ${error.message}`);
    process.exit(2);
  }
}

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isDate = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`));
const dayOf = (v) => (typeof v === 'string' ? v.slice(0, 10) : null);
const addDays = (date, n) => new Date(Date.parse(`${date}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export function contentHash(post) {
  const networks = isObject(post?.copy?.networks) ? post.copy.networks : {};
  const payload = Object.keys(networks).sort().map((n) => [n, networks[n]?.text ?? '', networks[n]?.link ?? null]);
  return `sha256:${createHash('sha256').update(JSON.stringify(payload)).digest('hex')}`;
}

function textLength(text, network) {
  const t = LINK_AS_23.has(network) ? text.replace(URL_RE, 'x'.repeat(23)) : text;
  return [...t].length;
}

function loadLint(lang) {
  const path = join(toolkitDir, 'references', 'language', `${lang}.lint.json`);
  if (!existsSync(path)) return [];
  return readJson(path, 'lint rules').rules.map((r) => ({ ...r, re: new RegExp(r.pattern, `${(r.flags || '').replace('g', '')}g`) }));
}

function tokens(text) {
  return new Set(text.toLowerCase().replace(URL_RE, ' ').split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 2));
}

function similarity(a, b) {
  const ta = tokens(a);
  const tb = tokens(b);
  if (ta.size < 5 || tb.size < 5) return 0;
  let shared = 0;
  for (const t of ta) if (tb.has(t)) shared++;
  return shared / (ta.size + tb.size - shared);
}

// Weekday names next to dates. Returns findings for mismatches.
const CS_DAYS = { po: 1, pondělí: 1, út: 2, úterý: 2, st: 3, středa: 3, středu: 3, čt: 4, čtvrtek: 4, pá: 5, pátek: 5, so: 6, sobota: 6, sobotu: 6, ne: 0, neděle: 0, neděli: 0 };
const CS_MONTHS = { ledna: 1, února: 2, března: 3, dubna: 4, května: 5, června: 6, července: 7, srpna: 8, září: 9, října: 10, listopadu: 11, prosince: 12 };
const CS_DATE_RE = new RegExp(
  `(?<!\\p{L})(${Object.keys(CS_DAYS).join('|')})\\s+(\\d{1,2})\\.\\s?(?:(\\d{1,2})\\.|(${Object.keys(CS_MONTHS).join('|')}))(?:\\s?(\\d{4}))?`,
  'giu',
);
const EN_DAYS = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
const EN_MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const EN_DAY = '(Mon(?:day)?|Tue(?:s|sday)?|Wed(?:nesday)?|Thu(?:r|rs|rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?)';
const EN_MONTH = '(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t|tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';
const EN_DATE_RE = new RegExp(
  `\\b${EN_DAY}\\.?,?\\s+(?:(\\d{1,2})(?:st|nd|rd|th)?\\s+${EN_MONTH}|${EN_MONTH}\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?)\\b(?:,?\\s+(\\d{4}))?`,
  'gi',
);

function resolveYear(month, day, period) {
  const years = [...new Set([Number(period.from.slice(0, 4)), Number(period.to.slice(0, 4))])];
  const anchor = Date.parse(`${period.from}T00:00:00Z`);
  return years.sort((a, b) => Math.abs(Date.UTC(a, month - 1, day) - anchor) - Math.abs(Date.UTC(b, month - 1, day) - anchor))[0];
}

function weekdayMismatches(text, lang, period) {
  const out = [];
  const check = (label, weekday, day, month, year) => {
    if (!month || !day || month > 12 || day > 31) return;
    const y = year || resolveYear(month, day, period);
    const actual = new Date(Date.UTC(y, month - 1, day));
    if (actual.getUTCMonth() !== month - 1) return out.push(`"${label}" is not a valid date`);
    if (actual.getUTCDay() !== weekday) out.push(`"${label}": ${y}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} is not that weekday`);
  };
  if (lang === 'cs') {
    for (const m of text.matchAll(CS_DATE_RE)) {
      check(m[0], CS_DAYS[m[1].toLowerCase()], Number(m[2]), m[3] ? Number(m[3]) : CS_MONTHS[m[4]?.toLowerCase()], m[5] && Number(m[5]));
    }
  } else if (lang === 'en') {
    for (const m of text.matchAll(EN_DATE_RE)) {
      const monthName = (m[3] || m[4]).slice(0, 3).toLowerCase();
      check(m[0], EN_DAYS[m[1].slice(0, 3).toLowerCase()], Number(m[2] || m[5]), EN_MONTHS[monthName], m[6] && Number(m[6]));
    }
  }
  return out;
}

function historyPostIds(dir, packageId) {
  const ids = new Map();
  if (!dir) return ids;
  if (!existsSync(dir)) {
    console.error(`History folder not found: ${dir}`);
    process.exit(2);
  }
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.json')) continue;
    let data;
    try {
      data = JSON.parse(readFileSync(join(dir, name), 'utf8'));
    } catch {
      continue;
    }
    if (data?.contract !== 'social-package/1' || data.packageId === packageId) continue;
    for (const p of data.posts || []) if (p?.id) ids.set(p.id, data.packageId);
  }
  return ids;
}

export function checkPackage(pkg, config = {}, options = {}) {
  const now = options.now ? Date.parse(options.now) : Date.now();
  const history = options.history || new Map();
  const packageFindings = { blockers: [], warnings: [] };
  const postFindings = new Map();
  const b = (target, id, message, extra = {}) => target.blockers.push({ id, message, ...extra, source: 'toolkit' });
  const w = (target, id, message, extra = {}) => target.warnings.push({ id, message, ...extra, source: 'toolkit' });

  // C1: package shape
  if (pkg.contract !== 'social-package/1') b(packageFindings, 'C1', `contract must be "social-package/1", found ${JSON.stringify(pkg.contract)}`);
  for (const key of ['packageId', 'project']) if (typeof pkg[key] !== 'string' || !pkg[key]) b(packageFindings, 'C1', `missing ${key}`);
  const period = isObject(pkg.period) ? pkg.period : {};
  if (!isDate(period.from) || !isDate(period.to) || !period.timeZone) b(packageFindings, 'C1', 'period needs from, to (YYYY-MM-DD) and timeZone');
  const items = Array.isArray(pkg.sources?.items) ? pkg.sources.items : [];
  if (!Array.isArray(pkg.sources?.items)) b(packageFindings, 'C1', 'sources.items must be an array');
  if (!pkg.sources?.exportedAt) b(packageFindings, 'C1', 'sources.exportedAt is missing');
  const research = Array.isArray(pkg.research) ? pkg.research : [];
  if (!Array.isArray(pkg.research)) b(packageFindings, 'C1', 'research must be an array');
  const posts = Array.isArray(pkg.posts) ? pkg.posts : [];
  if (!Array.isArray(pkg.posts)) b(packageFindings, 'C1', 'posts must be an array');
  const periodOk = isDate(period.from) && isDate(period.to);

  const itemsByRef = new Map(items.map((i) => [i?.ref, i]));
  const claimsById = new Map(research.map((c) => [c?.id, c]));
  const excluded = (config.sources?.excludedDomains || []).map((d) => d.toLowerCase().replace(/^\./, ''));
  const isExcluded = (url) => {
    try {
      const host = new URL(url).hostname.toLowerCase();
      return excluded.some((d) => host === d || host.endsWith(`.${d}`));
    } catch {
      return false;
    }
  };

  // Claims: F3 on the package for every excluded source.
  for (const c of research) {
    if (!c?.id || !c.subjectRef || !c.claim || !Array.isArray(c.sources) || !['confirmed', 'single-source', 'conflicting', 'owner'].includes(c.status)) {
      b(packageFindings, 'C1', `claim ${c?.id ?? '(no id)'} needs id, subjectRef, claim, sources[] and a valid status`);
      continue;
    }
    if (c.status !== 'owner' && c.sources.length === 0) b(packageFindings, 'F1', `claim ${c.id} has no sources`);
    for (const s of c.sources) if (s?.url && isExcluded(s.url)) b(packageFindings, 'F3', `claim ${c.id} cites an excluded source: ${s.url}`);
  }

  const lintCache = {};
  const lintFor = (lang) => (lintCache[lang] ??= loadLint(lang));
  const disabled = new Set(config.lint?.disable || []);
  const allowedTags = new Set((config.hashtags?.allowed || []).map((t) => t.toLowerCase()));
  const prefixes = config.links?.allowedPrefixes || [];
  const maxAgeHours = config.freshness?.maxAgeHours ?? 24;
  const seenIds = new Map();
  const subjectDates = new Map();

  for (const [index, post] of posts.entries()) {
    const f = { blockers: [], warnings: [] };
    postFindings.set(index, f);
    if (!isObject(post)) {
      b(f, 'C1', 'post is not an object');
      continue;
    }

    // C1: post shape
    for (const k of ['id', 'pillar', 'language']) if (typeof post[k] !== 'string' || !post[k]) b(f, 'C1', `missing ${k}`);
    if (post.language && !['cs', 'en'].includes(post.language)) b(f, 'C1', `language must be cs or en, found ${post.language}`);
    if (post.language && config.languages && !config.languages[post.language]) b(f, 'C1', `language ${post.language} is not enabled in config.languages`);
    if (!isDate(post.intendedDate)) b(f, 'C1', 'intendedDate must be YYYY-MM-DD');
    if (post.intendedTime != null && !/^\d{2}:\d{2}$/.test(post.intendedTime)) b(f, 'C1', 'intendedTime must be HH:MM or null');
    if (!Array.isArray(post.subjectRefs)) b(f, 'C1', 'subjectRefs must be an array');
    if (!Array.isArray(post.claimIds)) b(f, 'C1', 'claimIds must be an array');
    const networks = isObject(post.copy?.networks) ? post.copy.networks : null;
    if (!networks || Object.keys(networks).length === 0) b(f, 'C1', 'copy.networks needs at least one network');

    // D1: duplicate IDs
    if (post.id) {
      if (seenIds.has(post.id)) b(f, 'D1', `post id ${post.id} is used twice in this package`);
      seenIds.set(post.id, true);
      if (history.has(post.id)) b(f, 'D1', `post id ${post.id} already exists in package ${history.get(post.id)}`);
    }

    // S1, S2: subjects and dates
    for (const ref of post.subjectRefs || []) {
      const item = itemsByRef.get(ref);
      if (!item) {
        b(f, 'S1', `subjectRef ${ref} is not in sources.items`);
        continue;
      }
      if (isDate(post.intendedDate) && item.validUntil && post.intendedDate > dayOf(item.validUntil)) {
        b(f, 'S2', `intendedDate ${post.intendedDate} is after ${ref}'s validUntil ${item.validUntil}`);
      }
      if (isDate(post.intendedDate)) {
        if (!subjectDates.has(ref)) subjectDates.set(ref, []);
        subjectDates.get(ref).push(post.intendedDate);
      }
    }
    if (periodOk && isDate(post.intendedDate) && (post.intendedDate < period.from || post.intendedDate > period.to)) {
      b(f, 'S2', `intendedDate ${post.intendedDate} is outside the period ${period.from}–${period.to}`);
    }

    // F1, F3, W3, W4: claims
    for (const id of post.claimIds || []) {
      const c = claimsById.get(id);
      if (!c) {
        b(f, 'F1', `claimId ${id} is not in research`);
        continue;
      }
      if (c.lang && post.language && c.lang !== post.language) w(f, 'W8', `claim ${id} is in ${c.lang}, the post is in ${post.language}: write the claim in the post's language`);
      if (c.status === 'single-source') w(f, 'W3', `claim ${id} rests on a single source`);
      if (c.status === 'conflicting') w(f, 'W4', `claim ${id} is conflicting: it must be left out or told as told (F2)`);
      for (const s of c.sources || []) if (s?.url && isExcluded(s.url)) b(f, 'F3', `claim ${id} cites an excluded source: ${s.url}`);
    }

    // Media: F6, M2
    for (const [mi, m] of (Array.isArray(post.media) ? post.media : []).entries()) {
      const label = m?.path || `media #${mi}`;
      if (!m?.altText || !String(m.altText).trim()) b(f, 'M2', `${label} has no alt text`);
      const r = m?.rights;
      if (!r?.basis) b(f, 'F6', `${label} has no rights basis`);
      else if (r.basis !== 'own' && (!r.holder || !r.recordedAt)) b(f, 'F6', `${label} (${r.basis}) needs rights.holder and rights.recordedAt`);
    }

    // Per network
    const texts = [];
    for (const [network, variant] of Object.entries(networks || {})) {
      const text = variant?.text;
      if (typeof text !== 'string' || !text.trim()) {
        b(f, 'C1', 'text is empty', { network });
        continue;
      }
      texts.push([network, text]);
      const netConfig = config.networks?.[network] || {};
      if (config.networks && !config.networks[network]) w(f, 'W5', `network ${network} is not in config.networks`, { network });

      // P1: length and Instagram hashtags
      const limit = netConfig.maxLength || DEFAULT_LIMITS[network];
      const length = textLength(text, network);
      if (limit && length > limit) b(f, 'P1', `${length} characters, limit ${limit}`, { network });
      const tags = text.match(HASHTAG_RE) || [];
      if (network === 'instagram' && tags.length > 5) b(f, 'P1', `${tags.length} hashtags; Instagram accepts 5 through TryPost`, { network });

      // W5: hashtags
      const range = netConfig.hashtags || DEFAULT_HASHTAGS[network];
      if (range && (tags.length < range.min || tags.length > range.max) && !(network === 'instagram' && tags.length > 5)) {
        w(f, 'W5', `${tags.length} hashtags, preferred ${range.min}–${range.max}`, { network });
      }
      if (allowedTags.size) {
        const unknown = tags.filter((t) => !allowedTags.has(t.toLowerCase()));
        if (unknown.length) w(f, 'W5', `hashtags not on the project list: ${unknown.join(' ')}`, { network });
      }

      // L1, M1: links
      const urls = [...(text.match(URL_RE) || []), ...(variant.link ? [variant.link] : [])];
      if (prefixes.length) for (const u of new Set(urls)) if (!prefixes.some((p) => u.startsWith(p))) b(f, 'L1', `link not allowed: ${u}`, { network });
      if (netConfig.requireLink && urls.length === 0) b(f, 'M1', 'this network requires a link', { network });
      if (variant.link && !LINK_CARD_OR_NONE.has(network) && !text.includes(variant.link)) w(f, 'W5', 'link is set but does not appear in the text', { network });

      // S3: weekday names
      if (periodOk) for (const msg of weekdayMismatches(text, post.language, period)) b(f, 'S3', msg, { network });

      // W2: emoji and exclamation marks
      const emoji = (text.match(EMOJI_RE) || []).length;
      if (emoji > 1) w(f, 'W2', `${emoji} emoji`, { network });
      const bangs = (text.replace(URL_RE, '').match(/!/g) || []).length;
      if (bangs > 1) w(f, 'W2', `${bangs} exclamation marks`, { network });

      // W1: language lint
      const plain = text.replace(URL_RE, ' ');
      const langConfig = config.languages?.[post.language] || {};
      for (const rule of lintFor(post.language)) {
        if (rule.enabled === false || disabled.has(rule.id)) continue;
        if (rule.when && Object.entries(rule.when).some(([k, v]) => langConfig[k] !== v)) continue;
        const matches = [...plain.matchAll(rule.re)].map((m) => m[0]);
        if (matches.length > (rule.max ?? 0)) {
          const sample = [...new Set(matches)].slice(0, 3).map((s) => `"${s.trim()}"`).join(', ');
          w(f, 'W1', `${rule.message} (${sample})`, { network, rule: rule.id, lang: post.language });
        }
      }

      // W7: project avoid list
      for (const word of config.lint?.avoid?.[post.language] || []) {
        const re = new RegExp(`(?<![\\p{L}\\p{N}])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'iu');
        if (re.test(plain)) w(f, 'W7', `"${word}" is on the project's avoid list`, { network });
      }
    }

    // W6: near-identical variants
    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        const s = similarity(texts[i][1], texts[j][1]);
        if (s >= 0.85) w(f, 'W6', `${texts[i][0]} and ${texts[j][0]} are nearly identical (${Math.round(s * 100)} % shared words)`);
      }
    }

    // W11: freshness
    const validated = Date.parse(post.freshness?.validatedAt || pkg.sources?.exportedAt || '');
    if (Number.isNaN(validated)) w(f, 'W11', 'no freshness time: revalidate project data before drafting');
    else if ((now - validated) / 3600000 > maxAgeHours) {
      w(f, 'W11', `project data last validated ${Math.round((now - validated) / 3600000)} h ago (window ${maxAgeHours} h)`);
    }

    // D2: TryPost state
    const tp = post.trypost;
    if (tp?.contentHash && (!Array.isArray(tp.posts) || tp.posts.length === 0)) {
      b(f, 'D2', 'trypost.contentHash is set but trypost.posts is empty: a new push would create duplicate drafts');
    } else if (tp?.contentHash && tp.contentHash !== contentHash(post)) {
      w(f, 'W12', 'copy changed since it was sent: social-draft will update the existing drafts');
    }
  }

  // W10: repetition
  const maxPerSubject = config.repetition?.maxPostsPerSubject ?? 2;
  for (const [ref, dates] of subjectDates) {
    if (dates.length > maxPerSubject) w(packageFindings, 'W10', `${ref} is in ${dates.length} posts (limit ${maxPerSubject})`);
    const unique = [...new Set(dates)].sort();
    for (let i = 1; i < unique.length; i++) {
      if (addDays(unique[i - 1], 1) === unique[i]) w(packageFindings, 'W10', `${ref} is posted on consecutive days (${unique[i - 1]}, ${unique[i]})`);
    }
  }

  return { packageFindings, postFindings };
}

function merge(existing, fresh, ranAt) {
  const keep = (list) => (Array.isArray(list) ? list.filter((x) => x?.source && x.source !== 'toolkit') : []);
  return {
    ...(isObject(existing) ? existing : {}),
    ranAt,
    blockers: [...keep(existing?.blockers), ...fresh.blockers],
    warnings: [...keep(existing?.warnings), ...fresh.warnings],
    acknowledged: Array.isArray(existing?.acknowledged) ? existing.acknowledged : [],
  };
}

function formatFinding(x, acknowledged) {
  const where = [x.network, x.rule].filter(Boolean).join(', ');
  const ack = acknowledged?.some((a) => a.id === x.id) ? ' (acknowledged)' : '';
  return `  ${x.id}${where ? ` [${where}]` : ''}: ${x.message}${x.source && x.source !== 'toolkit' ? ` (${x.source})` : ''}${ack}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const pkgPath = resolve(args.package);
  const pkg = readJson(pkgPath, 'package');
  const config = args.config ? readJson(resolve(args.config), 'config') : {};

  if (args.hash) {
    console.log(JSON.stringify(Object.fromEntries((pkg.posts || []).map((p) => [p.id, contentHash(p)])), null, 2));
    return;
  }

  const history = historyPostIds(args.history && resolve(args.history), pkg.packageId);
  const { packageFindings, postFindings } = checkPackage(pkg, config, { now: args.now, history });
  const ranAt = new Date(args.now ? Date.parse(args.now) : Date.now()).toISOString();

  pkg.checks = merge(pkg.checks, packageFindings, ranAt);
  (pkg.posts || []).forEach((post, index) => {
    if (!isObject(post)) return;
    post.checks = merge(post.checks, postFindings.get(index) || { blockers: [], warnings: [] }, ranAt);
  });

  const blockerCount = pkg.checks.blockers.length + (pkg.posts || []).reduce((n, p) => n + (p?.checks?.blockers?.length || 0), 0);
  const warningCount = pkg.checks.warnings.length + (pkg.posts || []).reduce((n, p) => n + (p?.checks?.warnings?.length || 0), 0);

  if (args.write) writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  if (args.json) {
    console.log(JSON.stringify({ blockers: blockerCount, warnings: warningCount, package: pkg.checks, posts: Object.fromEntries((pkg.posts || []).map((p) => [p?.id, p?.checks])) }, null, 2));
  } else {
    const sections = [['package', pkg.checks], ...(pkg.posts || []).map((p, i) => [p?.id ?? `#${i}`, p?.checks])];
    for (const [name, checks] of sections) {
      if (!checks || (checks.blockers.length === 0 && checks.warnings.length === 0)) continue;
      console.log(name);
      for (const x of checks.blockers) console.log(`  BLOCKER${formatFinding(x, checks.acknowledged).slice(1)}`);
      for (const x of checks.warnings) console.log(`  warning${formatFinding(x, checks.acknowledged).slice(1)}`);
    }
    console.log(`${blockerCount} blocker(s), ${warningCount} warning(s)${args.write ? `; written to ${args.package}` : ''}`);
  }
  process.exit(blockerCount > 0 ? 1 : 0);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

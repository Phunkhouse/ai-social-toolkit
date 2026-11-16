#!/usr/bin/env node
// Self-test for check-package.mjs: the example passes, the bad fixture raises the expected IDs,
// and the language lint catches and spares the phrases it should.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkPackage, contentHash } from './check-package.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const config = read('templates/examples/config.example.json');
const now = '2026-11-21T10:00:00+01:00';
const ids = (findings, kind) => new Set([...findings.values()].flatMap((f) => f[kind].map((x) => x.id)));
const rules = (findings) => new Set([...findings.values()].flatMap((f) => f.warnings.map((x) => x.rule).filter(Boolean)));

// 1. The example is clean.
{
  const { packageFindings, postFindings } = checkPackage(read('templates/examples/package.example.json'), config, { now });
  const all = [...packageFindings.blockers, ...packageFindings.warnings, ...[...postFindings.values()].flatMap((f) => [...f.blockers, ...f.warnings])];
  assert.deepEqual(all, [], `example should have no findings, got ${JSON.stringify(all, null, 2)}`);
}

// 2. The bad fixture raises every blocker it was built for.
{
  const { packageFindings, postFindings } = checkPackage(read('scripts/fixtures/bad.package.json'), config, { now, history: new Map([['2026-W48-bad-cs', '2026-W47']]) });
  const blockers = ids(postFindings, 'blockers');
  for (const id of ['S1', 'S2', 'S3', 'F1', 'F3', 'F6', 'M2', 'L1', 'P1', 'D1', 'D2']) assert.ok(blockers.has(id), `expected blocker ${id}`);
  assert.ok(packageFindings.blockers.some((x) => x.id === 'F3'), 'expected package-level F3');
  const warnings = ids(postFindings, 'warnings');
  for (const id of ['W1', 'W2', 'W4', 'W5', 'W7', 'W11']) assert.ok(warnings.has(id), `expected warning ${id}`);
  const hit = rules(postFindings);
  for (const r of ['cs.gender-slash', 'cs.robotic-intro', 'cs.engagement-bait', 'cs.empty-praise', 'cs.ampm', 'cs.address-vy',
    'en.empty-praise', 'en.not-just', 'en.robotic-intro', 'en.engagement-bait', 'en.em-dash']) assert.ok(hit.has(r), `expected lint rule ${r}`);
}

// 3. Lint spares natural copy and respects project settings.
function lintRules(text, lang, cfg = config) {
  const pkg = read('templates/examples/package.example.json');
  const post = pkg.posts.find((p) => p.language === lang);
  post.copy.networks = { facebook: { text, link: 'https://example.org/' } };
  const { postFindings } = checkPackage(pkg, cfg, { now });
  return [...postFindings.values()].flatMap((f) => f.warnings.filter((x) => x.rule).map((x) => x.rule));
}
assert.deepEqual(lintRules('Hned tenhle víkend je z čeho vybírat. Který film bys chtěl vidět v kině? https://example.org/', 'cs'), []);
assert.deepEqual(lintRules('You can now save a filter and get back to it next time. https://example.org/', 'en'), []);
assert.deepEqual(lintRules('Najdete to na webu. https://example.org/', 'cs'), ['cs.address-vy']);
assert.deepEqual(lintRules('Najdete to na webu. https://example.org/', 'cs', { ...config, languages: { ...config.languages, cs: { address: 'vy' } } }), []);
assert.deepEqual(lintRules('Our favourite colour. https://example.org/', 'en', { ...config, languages: { ...config.languages, en: { variant: 'en-US' } } }), ['en.variant-uk']);
assert.deepEqual(lintRules('Byl/a jsi tam? https://example.org/', 'cs', { ...config, lint: { disable: ['cs.gender-slash'] } }), []);

// 4. Weekdays: right dates pass, wrong ones block.
function s3(text, lang) {
  const pkg = read('templates/examples/package.example.json');
  const post = pkg.posts.find((p) => p.language === lang);
  post.copy.networks = { facebook: { text: `${text} https://example.org/`, link: 'https://example.org/' } };
  return [...checkPackage(pkg, config, { now }).postFindings.values()].flatMap((f) => f.blockers).filter((x) => x.id === 'S3').length;
}
assert.equal(s3('V úterý 24. 11. a v pátek 27. listopadu.', 'cs'), 0);
assert.equal(s3('Ve středu 24. 11.', 'cs'), 1);
assert.equal(s3('Tuesday 24 November and Fri, Nov 27.', 'en'), 0);
assert.equal(s3('Wednesday 24 November.', 'en'), 1);

// 5. Content hash is stable and changes with the text.
{
  const post = read('templates/examples/package.example.json').posts[0];
  const h = contentHash(post);
  assert.match(h, /^sha256:[0-9a-f]{64}$/);
  assert.equal(contentHash(structuredClone(post)), h);
  post.copy.networks.facebook.text += ' ';
  assert.notEqual(contentHash(post), h);
}

console.log('check-package selftest: ok');

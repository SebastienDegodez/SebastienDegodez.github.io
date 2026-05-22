import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import yaml from 'js-yaml';

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function loadPresentations() {
  const raw = read('_data/presentations.yml');
  const parsed = yaml.load(raw);
  assert.ok(Array.isArray(parsed), '_data/presentations.yml must be a YAML array');
  return parsed;
}

test('homepage keeps critical identity content', () => {
  const index = read('index.md');

  assert.match(index, /DEGODEZ Sébastien/i, 'Missing main identity heading');
  assert.match(index, /Software Engineer.+AXA France/i, 'Missing current role');
  assert.match(index, /Brag Document/i, 'Missing Brag Document CTA');
  assert.match(index, /LinkedIn/i, 'Missing LinkedIn link');
});

test('layout keeps navigation shell and design tokens', () => {
  const layout = read('_layouts/default.html');

  assert.match(layout, /<nav class="site-nav"/i, 'Top navigation shell should exist');
  assert.match(layout, /design-tokens\.css/i, 'Design tokens stylesheet should stay wired');
  assert.match(layout, /\{\{\s*content\s*\}\}/i, 'Layout should render page content');
});

test('presentations catalog page keeps data-driven loop', () => {
  const page = read('presentations.md');

  assert.match(page, /for presentation in site\.data\.presentations/i, 'Catalog must remain data-driven from presentations.yml');
  assert.match(page, /project-card/i, 'Presentation card markup should exist');
  assert.match(page, /presentations-catalog\.html/i, 'Catalog permalink should stay stable');
});

test('presentations data file is valid and points to existing published files', () => {
  const items = loadPresentations();
  assert.ok(items.length > 0, 'At least one presentation should be published');

  for (const [index, item] of items.entries()) {
    const prefix = `Entry #${index + 1}`;

    assert.ok(item.id, `${prefix}: missing id`);
    assert.ok(item.title, `${prefix}: missing title`);
    assert.ok(item.project, `${prefix}: missing project`);
    assert.ok(item.source_repository, `${prefix}: missing source_repository`);
    assert.ok(item.source_path, `${prefix}: missing source_path`);
    assert.ok(Object.hasOwn(item, 'updated_at'), `${prefix}: missing updated_at`);
    assert.ok(Object.hasOwn(item, 'source_commit'), `${prefix}: missing source_commit`);
    assert.ok(item.url, `${prefix}: missing url`);

    assert.match(item.url, /^\/presentations\/.+\/$/, `${prefix}: url must target /presentations/<id>/`);

    const relativeTarget = item.url.replace(/^\//, '') + 'index.html';
    assert.ok(exists(relativeTarget), `${prefix}: published file does not exist (${relativeTarget})`);
  }
});

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
  assert.match(index, /Staff Engineer.+AXA France/i, 'Missing current role');
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

// ─── Blog ──────────────────────────────────────────────────────────────────

function frontMatter(file) {
  const match = read(file).match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, `${file}: front matter missing`);
  return yaml.load(match[1]);
}

function blogFiles() {
  return fs.readdirSync(path.join(root, '_blog')).filter((name) => name.endsWith('.md')).sort();
}

test('blog collection is configured and wired into the navigation', () => {
  const config = yaml.load(read('_config.yml'));
  assert.equal(config.collections?.blog?.output, true, 'Collection "blog" must output pages');
  assert.equal(config.collections.blog.permalink, '/blog/:slug/', 'Blog permalink must stay stable');

  const nav = yaml.load(read('_data/nav.yml'));
  assert.ok(nav.some((item) => item.url === '/blog/'), 'Navigation must link to /blog/');
  assert.ok(exists('blog/index.md'), 'Blog index page missing');
  assert.ok(exists('feed.xml'), 'RSS feed missing');
});

test('blog articles follow the NNN-slug naming and carry required front matter', () => {
  const files = blogFiles();
  assert.ok(files.length > 0, 'At least the article template should exist in _blog/');

  const slugs = new Set();
  for (const file of files) {
    assert.match(file, /^\d{3}-[a-z0-9-]+\.md$/, `${file}: expected NNN-slug.md (3 digits, lowercase slug)`);
    const data = frontMatter(`_blog/${file}`);
    for (const key of ['title', 'slug', 'date', 'description']) {
      assert.ok(data[key], `${file}: missing front matter "${key}"`);
    }
    assert.match(String(data.slug), /^[a-z0-9-]+$/, `${file}: slug must be lowercase letters, digits, hyphens`);
    assert.ok(!slugs.has(data.slug), `${file}: duplicate slug "${data.slug}"`);
    slugs.add(data.slug);
  }
});

test('blog articles share on LinkedIn and expose Open Graph metadata', () => {
  assert.match(read('_layouts/post.html'), /include share-linkedin\.html/, 'Post layout must include the LinkedIn share block');
  assert.match(read('_layouts/default.html'), /include head-extra\.html/, 'Default layout must include head-extra.html');
  assert.match(read('_includes/head-extra.html'), /og:image/, 'Open Graph image tag missing');

  const share = read('_includes/share-linkedin.html');
  assert.match(share, /data-share-button/, 'Share button missing');
  assert.match(share, /linkedin_text/, 'Share block must read linkedin_text from front matter');

  const script = read('assets/js/share-linkedin.js');
  assert.match(script, /linkedin\.com\/sharing\/share-offsite/, 'Share script must open the LinkedIn share endpoint');
  assert.match(script, /clipboard\.writeText/, 'Share script must copy the post text');
  assert.ok(exists('assets/img/og-default.png'), 'Default Open Graph image missing');
});

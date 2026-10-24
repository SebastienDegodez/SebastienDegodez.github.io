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

// Brag : la barre de filtres collante se pose SOUS le menu fixe (sinon elle masque la navigation, surtout sur mobile).
test('brag filters stick below the fixed navigation and stay on the Tech Glass palette', () => {
  const brag = read('brag.md');
  const theme = read('assets/css/tech-glass.css');
  assert.match(theme, /--nav-height:\s*[\d.]+rem/, 'tech-glass.css must expose the fixed nav height');
  const wrapper = brag.match(/\.filters-wrapper\s*\{([\s\S]*?)\}/)[1];
  assert.match(wrapper, /top:\s*calc\(var\(--nav-height\)/, 'sticky filters must start below the nav');
  const z = Number(wrapper.match(/z-index:\s*(\d+)/)[1]);
  const navZ = Number(theme.match(/\.site-nav\s*\{[\s\S]*?z-index:\s*(\d+)/)[1]);
  assert.ok(z < navZ, `filters (z-index ${z}) must stay under the nav (${navZ})`);
  assert.match(brag, /@media \(max-width: 768px\)[\s\S]*?\.brag-filters\s*\{[\s\S]*?flex-wrap:\s*nowrap/, 'mobile: one scrollable row per filter type');
  assert.match(brag, /\.filter-btn\s*\{[\s\S]*?font-family:\s*inherit/, 'buttons use the site font');
  for (const legacy of ['36, 181, 255', '76, 175, 80', '#81c784']) assert.ok(!brag.includes(legacy), `colour outside the palette: ${legacy}`);
});

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

// ─── Présentations Reveal.js ───────────────────────────────────────────────

function deckFiles() {
  return fs.readdirSync(path.join(root, '_decks')).filter((name) => name.endsWith('.md')).sort();
}

test('decks collection is configured apart from the generated presentations folder', () => {
  const config = yaml.load(read('_config.yml'));
  assert.equal(config.collections?.decks?.output, true, 'Collection "decks" must output pages');
  assert.equal(config.collections.decks.permalink, '/slides/:slug/', 'Decks permalink must stay stable');
  assert.ok(
    config.defaults.some((d) => d.scope?.type === 'decks' && d.values?.layout === 'deck'),
    'Decks must default to the "deck" layout'
  );
  // presentations/ est vidé par scripts/sync-presentations.sh : aucune source de deck ne doit y vivre.
  assert.ok(!fs.existsSync(path.join(root, 'presentations', '_decks')), 'Do not store decks inside presentations/');
});

test('deck files follow the NNN-slug naming and carry required front matter', () => {
  const files = deckFiles();
  assert.ok(files.length > 0, 'At least the deck template should exist in _decks/');

  const slugs = new Set();
  for (const file of files) {
    assert.match(file, /^\d{3}-[a-z0-9-]+\.md$/, `${file}: expected NNN-slug.md (3 digits, lowercase slug)`);
    const data = frontMatter(`_decks/${file}`);
    for (const key of ['title', 'slug', 'date', 'description']) {
      assert.ok(data[key], `${file}: missing front matter "${key}"`);
    }
    assert.match(String(data.slug), /^[a-z0-9-]+$/, `${file}: slug must be lowercase letters, digits, hyphens`);
    assert.ok(!slugs.has(data.slug), `${file}: duplicate slug "${data.slug}"`);
    slugs.add(data.slug);
  }
});

test('deck layout pins Reveal.js, uses the Tech Glass theme and the author identity', () => {
  const layout = read('_layouts/deck.html');

  assert.match(layout, /reveal\.js@5\.2\.1\/dist\/reveal\.js/, 'Reveal.js must be pinned to an exact version');
  assert.match(layout, /reveal-tech-glass\.css/, 'Tech Glass Reveal theme must be wired');
  assert.match(layout, /design-tokens\.css/, 'Design tokens must be loaded before the theme');
  assert.match(layout, /split:\s*'<hr \/>'/, 'Slides are split on the <hr /> rendered from ---');
  assert.ok(layout.indexOf('design-tokens.css') < layout.indexOf('reveal-tech-glass.css'), 'Tokens must load before the theme');

  const author = yaml.load(read('_data/author.yml'));
  for (const key of ['name', 'role', 'avatar', 'background']) {
    assert.ok(author[key], `_data/author.yml: missing "${key}"`);
  }
  assert.ok(exists('assets/css/reveal-tech-glass.css'), 'Reveal theme stylesheet missing');
});

test('presentations catalog shows the Reveal gallery without losing the synced catalog', () => {
  const page = read('presentations.md');
  assert.match(page, /include decks-gallery\.html/, 'Catalog must include the decks gallery');
  assert.match(page, /for presentation in site\.data\.presentations/i, 'Synced catalog loop must stay');
  assert.match(read('_includes/decks-gallery.html'), /site\.decks/, 'Gallery must read the decks collection');
});

test('hosted PR previews: main deploy keeps pr-preview/, previews are built under their own baseurl', () => {
  const deploy = yaml.load(read('.github/workflows/deploy-pages.yml'));
  const preview = yaml.load(read('.github/workflows/pr-preview.yml'));
  const step = (wf, job, re) => wf.jobs[job].steps.find((s) => re.test(s.uses || ''));

  const publish = step(deploy, 'deploy', /github-pages-deploy-action/);
  assert.equal(publish.with.branch, 'gh-pages');
  assert.match(publish.with['clean-exclude'], /pr-preview\//, 'deploying main must not erase PR previews');
  assert.ok(deploy.jobs.deploy.steps.some((s) => /\.nojekyll/.test(s.run || '')), 'gh-pages must not be rebuilt by Pages');

  const steps = preview.jobs.preview.steps;
  assert.equal(preview.jobs.preview.env.PREVIEW_DIR, 'pr-preview/pr-${{ github.event.number }}');
  const deployPreview = steps.find((s) => s.name === 'Deploy preview');
  assert.equal(deployPreview.with.branch, 'gh-pages');
  assert.equal(deployPreview.with.folder, '_site');
  assert.equal(deployPreview.with['target-folder'], '${{ env.PREVIEW_DIR }}', 'each PR lives in its own folder');
  assert.equal(deployPreview.if, "github.event.action != 'closed'");
  const remove = steps.find((s) => s.name === 'Remove preview');
  assert.equal(remove.if, "github.event.action == 'closed'", 'merge or close removes the preview');
  assert.equal(remove.with['target-folder'], '${{ env.PREVIEW_DIR }}');
  assert.ok(steps.some((s) => /mkdir -p empty-preview/.test(s.run || '') && s.if === remove.if), 'removal deploys an empty folder');
  assert.equal(remove.with.folder, 'empty-preview');
  const build = preview.jobs.preview.steps.find((s) => /jekyll build/.test(s.run || ''));
  assert.match(build.run, /--baseurl "\/pr-preview\/pr-\$\{\{ github\.event\.number \}\}"/, 'preview baseurl must match its folder');
  assert.deepEqual(preview.on.pull_request.types.sort(), ['closed', 'opened', 'reopened', 'synchronize']);
  assert.equal(deploy.concurrency.group, preview.concurrency.group, 'both workflows write gh-pages: same concurrency group');
});

test('PR preview: one sticky comment, written by scripts/pr-preview-comment.sh', () => {
  const preview = yaml.load(read('.github/workflows/pr-preview.yml'));
  const steps = preview.jobs.preview.steps;
  assert.ok(!steps.some((s) => /pr-preview-action/.test(s.uses || '')), 'no third-party action posting its own comment');
  const sticky = steps.find((s) => /sticky-pull-request-comment/.test(s.uses || ''));
  assert.ok(sticky, 'a sticky comment step is required (one comment per PR, updated)');
  assert.equal(sticky.with.header, 'pr-preview');
  assert.equal(sticky.with.path, 'preview-comment.md');
  const write = steps.find((s) => /pr-preview-comment\.sh/.test(s.run || ''));
  assert.match(write.run, /removed[\s\S]*pull_request\.merged/, 'closing the PR must update the comment');
  assert.ok(steps.indexOf(write) < steps.indexOf(sticky));
});

test('PR preview comment: preview URL, links to changed decks, removal message', async () => {
  const { execFileSync } = await import('node:child_process');
  const os = await import('node:os');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-'));
  fs.mkdirSync(path.join(dir, '_decks'));
  fs.writeFileSync(path.join(dir, '_decks/010-arazzo.md'), '---\ntitle: "Arazzo : le contrat"\nslug: arazzo\n---\n');
  fs.writeFileSync(path.join(dir, '_decks/000-modele-deck.md'), '---\npublished: false\ntitle: Modèle\nslug: modele\n---\n');
  const script = path.join(root, 'scripts/pr-preview-comment.sh');
  const run = (...args) => execFileSync('bash', [script, ...args], { cwd: dir, encoding: 'utf8' });

  const url = 'https://sebastiendegodez.github.io/pr-preview/pr-11';
  const deployed = run('deployed', url, '4d0d1979abcdef', '_decks/010-arazzo.md', '_decks/000-modele-deck.md', 'index.md');
  assert.match(deployed, /\*\*https:\/\/sebastiendegodez\.github\.io\/pr-preview\/pr-11\/\*\*/);
  assert.match(deployed, /- \[Arazzo : le contrat\]\(https:\/\/sebastiendegodez\.github\.io\/pr-preview\/pr-11\/slides\/arazzo\/\)/);
  assert.doesNotMatch(deployed, /modele/, 'unpublished template deck is not listed');
  assert.match(deployed, /`4d0d197`/);
  assert.doesNotMatch(run('deployed', url + '/', 'abc', 'index.md'), /Présentations modifiées/);
  fs.writeFileSync(path.join(dir, '_decks/020-autonome.html'), '---\ntitle: Deck autonome\nslug: autonome\nlayout: null\n---\n<html></html>\n');
  assert.match(run('deployed', url, 'abc', '_decks/020-autonome.html'), /\[Deck autonome\]\(.*\/slides\/autonome\/\)/, 'standalone HTML decks are listed too');

  assert.match(run('removed', '11', 'true'), /fusionnée[\s\S]*pr-preview\/pr-11\//);
  assert.match(run('removed', '11', 'false'), /fermée/);
});

test('PR preview: bootstraps the production site at the gh-pages root when it is missing', () => {
  const steps = yaml.load(read('.github/workflows/pr-preview.yml')).jobs.preview.steps;
  const check = steps.find((s) => s.id === 'prod');
  assert.match(check.run, /cat-file -e FETCH_HEAD:index\.html/, 'detects an empty gh-pages root');
  const publish = steps.find((s) => s.name === 'Publish main at the gh-pages root (first time only)');
  assert.equal(publish.if, "steps.prod.outputs.missing == 'true'", 'only when the root is missing');
  assert.equal(publish.with['target-folder'], undefined, 'the production site goes to the root');
  assert.match(publish.with['clean-exclude'], /pr-preview\//, 'never erases previews');
  const build = steps.find((s) => /worktree add -q main-site/.test(s.run || ''));
  assert.match(build.run, /origin main/, 'the root is the site of main, not of the PR');
  const prBuild = steps.findIndex((s) => /--baseurl/.test(s.run || ''));
  assert.ok(prBuild < steps.indexOf(build), 'PR site is built before main-site/ exists in the workspace');
});

// Les runners GitHub forcent Node 24 : une action encore en Node 20 lève un avertissement à chaque run.
test('workflows only use actions running on Node 24', () => {
  const minimum = {
    'actions/checkout': 5, 'actions/setup-node': 5, 'actions/upload-artifact': 5,
    'JamesIves/github-pages-deploy-action': [4, 9], 'marocchino/sticky-pull-request-comment': 3,
  };
  const banned = ['rossjrw/pr-preview-action']; // embarque une version Node 20 de github-pages-deploy-action
  for (const file of fs.readdirSync(path.join(root, '.github/workflows'))) {
    for (const [, action, version] of read(`.github/workflows/${file}`).matchAll(/uses:\s*([\w.-]+\/[\w.-]+)@v?([\d.]+)/g)) {
      assert.ok(!banned.includes(action), `${file}: ${action} runs Node 20`);
      const min = minimum[action];
      if (min === undefined) continue;
      const [maj, minor = 0] = version.split('.').map(Number);
      const [minMaj, minMinor = 0] = [].concat(min);
      assert.ok(maj > minMaj || (maj === minMaj && minor >= minMinor), `${file}: ${action}@v${version} runs Node 20`);
    }
  }
});

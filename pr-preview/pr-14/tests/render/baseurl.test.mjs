import assert from 'node:assert/strict';
import test from 'node:test';
import { createEngine, renderFile, dom, loadYaml, SITE_URL } from './liquid-env.mjs';

// Aperçus de PR : le site est construit avec --baseurl /pr-preview/pr-N (voir .github/workflows/pr-preview.yml).
// Tout lien interne doit alors rester dans ce sous-dossier, sinon l'aperçu charge le CSS ou les pages de production.
const BASE = '/pr-preview/pr-42';
const engine = createEngine({ baseurl: BASE });
const site = {
  url: SITE_URL,
  baseurl: BASE,
  data: {
    nav: loadYaml('_data/nav.yml'),
    author: loadYaml('_data/author.yml'),
    homepage: JSON.parse((await import('node:fs')).readFileSync('_data/homepage.json', 'utf8')),
    presentations: loadYaml('_data/presentations.yml'),
  },
  decks: [],
};

const localLinks = (html) => [...dom(html).querySelectorAll('[href], [src]')]
  .map((el) => el.getAttribute('href') ?? el.getAttribute('src'))
  .filter((v) => v.startsWith('/') && !v.startsWith('//'));

const assertInsideBase = (html, label) => {
  const links = localLinks(html);
  assert.ok(links.length > 0, `${label}: no internal link found`);
  for (const link of links) assert.ok(link.startsWith(BASE + '/'), `${label}: ${link} escapes ${BASE}`);
};

test('baseurl: default layout (CSS + navigation) stays inside the preview folder', async () => {
  assertInsideBase(await renderFile(engine, '_layouts/default.html', { page: { url: '/', title: 'Accueil' }, site, content: '' }), 'default.html');
});

test('baseurl: home page and presentations catalog links stay inside the preview folder', async () => {
  assertInsideBase(await renderFile(engine, 'index.md', { page: { url: '/' }, site }), 'index.md');
  assertInsideBase(await renderFile(engine, 'presentations.md', { page: { url: '/presentations-catalog.html' }, site }), 'presentations.md');
});

test('baseurl: deck layout stays inside the preview folder', async () => {
  const page = { title: 'T', slug: 't', date: new Date('2026-10-23T00:00:00Z'), description: 'd', url: '/slides/t/', collection: 'decks' };
  assertInsideBase(await renderFile(engine, '_layouts/deck.html', { page, site, content: '<p>x</p>' }), 'deck.html');
});

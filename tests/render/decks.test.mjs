import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import yaml from 'js-yaml';
import { createEngine, renderFile, read, dom, loadYaml, root, SITE_URL } from './liquid-env.mjs';

const engine = createEngine();
const SITE = { url: SITE_URL, data: { author: loadYaml('_data/author.yml') } };
const page = {
  title: 'Arazzo pour AXA', subtitle: 'Orchestrer les workflows d\'API', event: 'Meetup interne AXA',
  date: new Date('2026-11-05T00:00:00Z'), description: 'Intro', url: '/slides/arazzo/', collection: 'decks',
};
// Sortie type kramdown : chaque --- du Markdown devient <hr />.
const content = '<p>Intro</p>\n\n<hr />\n\n<h2>Deux</h2>\n\n<hr />\n\n<h2>Trois</h2>\n<aside class="notes"><p>Notes</p></aside>\n\n<hr />\n';
const slidesOf = async (p, c = content) => [...dom(await renderFile(engine, '_layouts/deck.html', { page: p, site: SITE, content: c })).querySelectorAll('.reveal .slides > section')];

test('deck: generated title slide, one slide per ---, generated end slide', async () => {
  const s = await slidesOf(page);
  assert.equal(s.length, 5, 'titre + 3 contenus + fin');
  assert.ok(s[0].classList.contains('slide-title'));
  assert.match(s[0].textContent, /Meetup interne AXA[\s\S]*Sébastien Degodez[\s\S]*Staff Engineer[\s\S]*5 novembre 2026/);
  assert.equal(s[1].textContent.trim(), 'Intro');
  assert.ok(s[3].querySelector('aside.notes'), 'speaker notes stay in their slide');
  assert.ok(s[4].classList.contains('slide-end'));
  assert.ok(!s.some((x) => x.innerHTML.trim() === ''), 'trailing --- creates no empty slide');
});

test('deck: <hr> and <hr/> separators are accepted too', async () => {
  for (const variant of ['<hr>', '<hr/>']) {
    assert.equal((await slidesOf(page, content.replaceAll('<hr />', variant))).length, 5, variant);
  }
});

test('deck: end_slide false and optional fields', async () => {
  const s = await slidesOf({ ...page, end_slide: false, subtitle: undefined, event: undefined });
  assert.equal(s.length, 4);
  assert.equal(s[0].querySelector('.slide-title__eyebrow'), null);
  assert.equal(s[0].querySelector('.slide-title__subtitle'), null);
});

test('gallery: hidden when empty, newest first, thumbnail or icon fallback', async () => {
  const gallery = (decks) => engine.parseAndRender(read('_includes/decks-gallery.html'), { site: { ...SITE, decks } });
  assert.equal((await gallery([])).trim(), '');
  const recent = { ...page, thumbnail: '/assets/img/decks/a.png', tags: ['Microcks'] };
  const older = { ...page, title: 'Ancien', url: '/slides/ancien/', date: new Date('2026-01-10T00:00:00Z'), event: undefined };
  const cards = [...dom(await gallery([older, recent])).querySelectorAll('.deck-card')];
  assert.equal(cards[0].querySelector('.deck-card__title').textContent.trim(), page.title);
  assert.ok(cards[0].querySelector('img'));
  assert.ok(cards[1].querySelector('.fa-display'));
});

// Chaque deck réellement publié dans _decks/ doit se rendre sans erreur (contenu Markdown passé tel quel).
test('every published deck renders', async () => {
  const files = fs.readdirSync(path.join(root, '_decks')).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const fm = read(`_decks/${file}`).match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const data = yaml.load(fm[1]);
    if (data.published === false) continue;
    const s = await slidesOf({ ...data, date: new Date(data.date), url: `/slides/${data.slug}/` }, '<p>contenu</p>');
    assert.ok(s.length >= 2, `${file}: expected at least title + one slide`);
  }
});

// Deck Arazzo (HTML autonome validé) : la norme « spécifie » ; aucun outil avant la partie Microcks,
// et chaque diapo Microcks porte le bandeau « prototype ».
test('arazzo deck: no tooling talk before the Microcks hypothesis, Microcks slides flagged as prototype', () => {
  const html = read('_decks/010-arazzo.html');
  const slides = html.split('<section class="slide').slice(1);
  const hypothesis = slides.findIndex((s) => /data-title="Hypothèse Microcks/.test(s));
  assert.ok(hypothesis > 0, 'the Microcks hypothesis slide must exist');
  slides.slice(0, hypothesis).forEach((s, i) => {
    const text = s.replace(/<aside class="notes">[\s\S]*?<\/aside>/g, '');
    assert.doesNotMatch(text, /\boutils?\b|détect|outillage/i, `slide #${i + 1} talks about tooling before the Microcks part`);
  });
  slides.filter((s) => /<h2[^>]*>[\s\S]*?Microcks[\s\S]*?<\/h2>/.test(s) || /data-title="Hypothèse Microcks/.test(s)).forEach((s) => {
    assert.match(s, /class="proto"/, `Microcks slide without prototype banner: ${s.match(/data-title="([^"]*)"/)[1]}`);
  });
});

test('arazzo deck: standalone page, no layout, assets resolved relative to /slides/arazzo/', () => {
  const src = read('_decks/010-arazzo.html');
  const fm = yaml.load(src.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
  // Jekyll : avec un default `layout: deck` sur la collection, `layout: null` est ignoré ; seul `none` désactive le layout.
  assert.equal(fm.layout, 'none', 'published as is, without the Reveal layout');
  const defaults = yaml.load(read('_config.yml')).defaults.find((d) => d.scope.type === 'decks');
  assert.equal(defaults.values.layout, 'deck', 'if this default disappears, revisit this test');
  assert.equal(fm.slug, 'arazzo');
  for (const key of ['title', 'date', 'description', 'thumbnail']) assert.ok(fm[key], `front matter: ${key}`);
  assert.ok(fs.existsSync(path.join(root, fm.thumbnail.replace(/^\//, ''))), 'thumbnail exists');
  const body = src.replace(/^---[\s\S]*?---\r?\n/, '');
  assert.match(body, /^\{% raw %\}<!doctype html>/, 'Liquid must not touch the deck');
  assert.match(body, /\{% endraw %\}\s*$/);
  for (const [, ref] of body.matchAll(/(?:src|data-full|href)="(\.\.\/\.\.\/assets\/[^"]+)"/g)) {
    assert.ok(fs.existsSync(path.join(root, ref.replace('../../', ''))), `missing asset ${ref}`);
  }
  assert.doesNotMatch(body, /(?:src|href|data-full)="\/(?!\/)/, 'no absolute internal path (would escape the PR preview)');
});

// Deck Arazzo hors scène : retour vers le site, lecture sur téléphone. Le contenu des diapos ne change pas.
test('arazzo deck: back link to the site, portrait hint and swipe navigation for phones', () => {
  const body = read('_decks/010-arazzo.html');
  const back = body.match(/<a class="site-back" href="([^"]+)"/);
  assert.ok(back, 'a link back to the site');
  assert.equal(back[1], '../../presentations-catalog.html', 'relative, so it also works in PR previews');
  assert.ok(body.indexOf('class="site-back"') > body.indexOf('id="counter"'), 'outside the scaled stage (after its last element)');
  assert.match(body, /@media \(orientation: portrait\) and \(max-width: 900px\)[\s\S]*?\.rotate-hint \{ display: flex; \}/, 'portrait hint on phones only');
  assert.match(body, /id="rotate-dismiss"[\s\S]*rotate-dismissed/, 'the hint can be dismissed');
  assert.match(body, /addEventListener\('touchend'[\s\S]*?go\(dx < 0 \? 1 : -1\)/, 'swipe changes slide');
  assert.match(body, /body:not\(\.speaker-mode\) \{ position: fixed; inset: 0; \}/, 'the 1920px stage must not widen the mobile page');
  assert.match(body, /@media print \{[\s\S]*?\.site-back, \.rotate-hint \{ display: none !important; \}/, 'not printed in the PDF export');
});

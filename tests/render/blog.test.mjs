import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { createEngine, renderFile, read, dom, SITE_URL } from './liquid-env.mjs';

const engine = createEngine();
const SITE = { url: SITE_URL };
const article = {
  title: 'Skraft v2 : un pipeline déterministe',
  url: '/blog/skraft-v2/',
  date: new Date('2026-10-23T00:00:00Z'),
  description: 'Pourquoi des garde-fous mécaniques changent tout.',
  tags: ['skraft', 'Claude Code', '.NET'],
  collection: 'blog',
  linkedin_text: 'Mon texte\n\nAvec "guillemets" & <chevrons>.',
};
const renderPost = (page, content = '<p>x</p>') => renderFile(engine, '_layouts/post.html', { page, site: SITE, content });

test('post layout: title, French date, reading time, tags', async () => {
  const d = dom(await renderPost(article, '<p>' + 'mot '.repeat(450) + '</p>'));
  assert.equal(d.querySelector('h1.page-header__title').textContent, article.title);
  assert.match(d.querySelector('time').textContent, /23 octobre 2026/);
  assert.equal(d.querySelector('time').getAttribute('datetime'), '2026-10-23');
  assert.match(d.body.textContent, /3 min de lecture/);
  assert.equal(d.querySelectorAll('.post-meta .tag').length, 3);
});

test('LinkedIn share block: absolute URL and linkedin_text kept intact', async () => {
  const d = dom(await renderPost(article));
  assert.equal(d.querySelector('[data-share-linkedin]').getAttribute('data-share-url'), SITE_URL + '/blog/skraft-v2/');
  assert.equal(d.querySelector('[data-share-text]').value, article.linkedin_text);
});

test('LinkedIn default text: title, description, hashtags, no link', async () => {
  const text = dom(await renderPost({ ...article, linkedin_text: undefined })).querySelector('[data-share-text]').value;
  assert.ok(text.startsWith(article.title) && text.includes(article.description));
  assert.match(text, /#skraft #ClaudeCode #NET/);
  assert.ok(!text.includes('http'));
});

test('Open Graph: article vs website, absolute URLs, no empty description', async () => {
  const head = (page) => engine.parseAndRender(read('_includes/head-extra.html'), { page, site: SITE });
  const a = dom('<head>' + (await head(article)) + '</head>');
  const meta = (d, p) => d.querySelector(`meta[property="${p}"]`)?.getAttribute('content');
  assert.equal(meta(a, 'og:type'), 'article');
  assert.equal(meta(a, 'og:url'), SITE_URL + '/blog/skraft-v2/');
  assert.equal(meta(a, 'og:image'), SITE_URL + '/assets/img/og-default.png');
  const home = dom('<head>' + (await head({ title: 'Accueil', url: '/' })) + '</head>');
  assert.equal(meta(home, 'og:type'), 'website');
  assert.equal(home.querySelector('meta[name="description"]'), null);
});

test('blog index: empty state, newest first', async () => {
  const empty = dom(await renderFile(engine, '_layouts/blog-index.html', { site: { ...SITE, blog: [] } }));
  assert.ok(empty.querySelector('.blog-empty'));
  const older = { ...article, title: 'Ancien', url: '/blog/ancien/', date: new Date('2026-01-05T00:00:00Z'), tags: [] };
  const d = dom(await renderFile(engine, '_layouts/blog-index.html', { site: { ...SITE, blog: [older, article] } }));
  const titles = [...d.querySelectorAll('.project-card__name')].map((e) => e.textContent.trim());
  assert.deepEqual(titles, [article.title, 'Ancien']);
});

test('RSS feed is well-formed XML', async () => {
  const xml = await renderFile(engine, 'feed.xml', { site: { ...SITE, blog: [article] } });
  const doc = new JSDOM(xml, { contentType: 'application/xml' }).window.document;
  assert.equal(doc.querySelector('parsererror'), null);
  assert.equal(doc.querySelectorAll('item').length, 1);
});

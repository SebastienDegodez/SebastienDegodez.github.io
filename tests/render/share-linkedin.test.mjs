import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { createEngine, read } from './liquid-env.mjs';

const engine = createEngine();
const script = read('assets/js/share-linkedin.js');
const markup = await engine.parseAndRender(read('_includes/share-linkedin.html'), {
  page: { title: 'T', url: '/blog/a b/?x=1&y=2', description: 'D', tags: ['x'], linkedin_text: 'Texte initial' },
});
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

// Monte le bloc dans un faux navigateur, avec presse-papiers et window.open simulés.
function mount(clipboard) {
  const w = new JSDOM(`<body>${markup.replace(/<script[^>]*><\/script>/, '')}</body>`, { runScripts: 'outside-only' }).window;
  const calls = { open: [], copied: [] };
  w.open = (...args) => { calls.open.push(args); return null; }; // noopener → null, comme un vrai navigateur
  if (clipboard === 'ok') Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: (t) => { calls.copied.push(t); return Promise.resolve(); } } });
  if (clipboard === 'reject') Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) } });
  w.eval(script);
  return { $: (s) => w.document.querySelector(s), calls };
}

test('copies the post text and opens LinkedIn with the encoded article URL', async () => {
  const { $, calls } = mount('ok');
  $('[data-share-button]').click();
  await tick();
  assert.deepEqual(calls.copied, ['Texte initial']);
  assert.equal(calls.open.length, 1);
  assert.equal(calls.open[0][0], 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent('https://sebastiendegodez.github.io/blog/a b/?x=1&y=2'));
  assert.deepEqual(calls.open[0].slice(1), ['_blank', 'noopener']);
  assert.match($('[data-share-status]').textContent, /Texte copié/);
});

test('copies the edited text, trimmed', async () => {
  const { $, calls } = mount('ok');
  $('[data-share-text]').value = '  Ma version  \n';
  $('[data-share-button]').click();
  await tick();
  assert.deepEqual(calls.copied, ['Ma version']);
});

for (const clipboard of ['reject', 'absent']) {
  test(`clipboard ${clipboard}: still opens LinkedIn and falls back to manual copy`, async () => {
    const { $, calls } = mount(clipboard);
    $('[data-share-button]').click();
    await tick();
    assert.equal(calls.open.length, 1);
    assert.equal($('details').open, true);
    assert.match($('[data-share-status]').textContent, /Copie automatique impossible/);
  });
}

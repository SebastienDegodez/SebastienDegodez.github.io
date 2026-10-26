// Environnement de rendu Liquid proche de Jekyll, pour tester les templates sans Ruby ni Docker.
// liquidjs n'est PAS Jekyll : ces tests valident la logique des templates ; le vrai build reste celui de la CI.
import fs from 'node:fs';
import path from 'node:path';
import { Liquid } from 'liquidjs';
import { JSDOM } from 'jsdom';
import yaml from 'js-yaml';

export const root = process.cwd();
export const SITE_URL = 'https://sebastiendegodez.github.io';

export const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
export const stripFrontMatter = (source) => source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
export const loadYaml = (file) => yaml.load(read(file));
export const dom = (html) => new JSDOM(html).window.document;

// baseurl : comme `jekyll build --baseurl` (ex. aperçu de PR servi sous /pr-preview/pr-N).
export function createEngine({ baseurl = '' } = {}) {
  const engine = new Liquid({
    root: [path.join(root, '_includes')],
    extname: '',
    jekyllInclude: true, // {% include x.html key=value %} → include.key
    dynamicPartials: false,
  });
  // Filtres Jekyll absents de liquidjs.
  // Comme Jekyll : une URL déjà absolue (schéma ou //) est rendue telle quelle, sinon préfixée par baseurl.
  const isAbsolute = (v) => /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(String(v));
  const withBase = (v) => baseurl + (String(v).startsWith('/') ? v : '/' + v);
  engine.registerFilter('absolute_url', (v) => (isAbsolute(v) ? v : SITE_URL + withBase(v)));
  engine.registerFilter('relative_url', (v) => (isAbsolute(v) ? v : withBase(v)));
  engine.registerFilter('number_of_words', (v) => String(v).split(/\s+/).filter(Boolean).length);
  engine.registerFilter('xml_escape', (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
  engine.registerFilter('date_to_rfc822', (v) => new Date(v).toUTCString());
  // {% link chemin %} (Jekyll 4) : URL de la page, préfixée par baseurl ; permalink du front matter sinon .md → .html.
  engine.registerTag('link', {
    parse(token) { this.target = token.args.trim(); },
    render() {
      const fm = (read(this.target).match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
      const permalink = (yaml.load(fm) || {}).permalink;
      return baseurl + (permalink || '/' + this.target.replace(/\.md$/, '.html'));
    },
  });
  // Liquid Ruby : divided_by entre deux entiers = division entière (liquidjs fait une division réelle).
  engine.registerFilter('divided_by', (a, b) => (Number.isInteger(+a) && Number.isInteger(+b) ? Math.floor(+a / +b) : +a / +b));
  return engine;
}

export function renderFile(engine, file, context) {
  return engine.parseAndRender(stripFrontMatter(read(file)), context);
}

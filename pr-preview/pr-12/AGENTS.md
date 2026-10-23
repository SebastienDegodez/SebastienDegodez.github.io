# AGENTS.md — mode d'emploi pour les agents (Claude Code, Copilot, Codex…)

Ce fichier dit **comment réussir une modification de ce site sans rien casser**. Il complète
[`AGENT.md`](AGENT.md) (stack et serveur local) et les guides humains de [`docs/`](docs/).

## 1. Règles qui ne se négocient pas

1. **Ne jamais écrire dans `presentations/` ni `_data/presentations.yml`.** `scripts/sync-presentations.sh`
   (workflow `Sync Presentations`, chaque nuit) **supprime et recrée** `presentations/` depuis `skraft-plugin` et
   `meetup-coding-with-ai`. Pour changer un deck synchronisé : modifier sa source ou la liste `ENTRIES` du script.
   Exception admise : aligner `_data/presentations.yml` sur un changement de `ENTRIES`, dans le même commit.
2. **Ne pas supprimer ce qu'on ne comprend pas.** Les scripts Ruby de la racine (`fix_*.rb`, `patch_*.rb`,
   `update_filters.rb`, `list_tags.rb`) sont des migrations ponctuelles déjà appliquées à `brag.md` / `_data/brag.json`,
   sans aucune référence. On les garde tant que le propriétaire n'a pas décidé de les archiver.
3. **`_data/brag.json` garde l'historique.** On ajoute une entrée (nouveau rôle, nouveau projet), on ne réécrit pas le passé.
   Rôles : Tech Lead (juin 2023 → juin 2026), puis Staff Engineer (depuis juin 2026).
4. **Ne pas inventer de contenu.** Réalisations, chiffres, dates, texte de slides : venant du propriétaire, ou absents.
   Le blog est volontairement vide tant qu'il n'a pas écrit d'article.
5. **Une PR par lot**, en Conventional Commits rédigés en français (`feat(blog): …`, `fix(slides): …`).

## 2. Carte du dépôt

Contenus éditoriaux = collections Jekyll, fichiers numérotés **sur 3 chiffres par pas de 10** (`010-`, `020-`…) ;
`000-` est réservé aux modèles (`published: false`).

```text
index.md, _data/homepage.json   Accueil (titre, cartes « Points forts »)
brag.md, _data/brag.json        Brag Document
_blog/NNN-slug.md               Articles          → /blog/<slug>/     layout _layouts/post.html
_decks/NNN-slug.md              Décks Reveal.js   → /slides/<slug>/   layout _layouts/deck.html
presentations.md                Page /presentations-catalog.html : galerie Reveal + catalogue synchronisé
_data/author.yml                Identité sur les diapos de titre et de fin
_data/nav.yml                   Menu (l'état actif est calculé dans _layouts/default.html)
_includes/                      head-extra (Open Graph), share-linkedin, decks-gallery, date-fr
design-tokens.css               Source des couleurs, polices, effet verre — le site ET les décks la lisent
assets/css/                     tech-glass (base), blog, decks (galerie), reveal-tech-glass (thème des slides)
assets/js/share-linkedin.js     Bouton de partage LinkedIn
docs/NNN-*.md                   Guides : 010 blog, 020 présentations
tests/                          site-regression (structure), render/ (rendu Liquid + DOM), e2e/ (Playwright)
presentations/                  ⚠ GÉNÉRÉ (voir règle 1)
```

## 3. Vérifier avant de proposer

```bash
npm ci
npm run test:site     # structure + rendu des templates (liquidjs + jsdom), ~1 s, sans Ruby ni Docker
```

- `tests/render/` rend les vrais templates avec **liquidjs**, qui **n'est pas Jekyll**. Les différences connues sont
  compensées dans `tests/render/liquid-env.mjs` (`divided_by` entier, `absolute_url`, `number_of_words`…).
  Un nouveau filtre Jekyll dans un template = l'ajouter là, sinon le test plante.
- Le **vrai build Jekyll** n'existe qu'en CI (`Site Regression` : `jekyll/jekyll:4` dans Docker, puis Playwright).
  Dans un bac à sable sans Docker ni RubyGems, le dire clairement : « templates testés, rendu réel non vu ».
- **Aperçu hébergé de chaque PR** (`pr-preview.yml`) : `https://sebastiendegodez.github.io/pr-preview/pr-<n>/`.
  Un **commentaire unique** (`scripts/pr-preview-comment.sh`) donne le lien et ceux des présentations modifiées ; il
  est mis à jour à chaque push. Au merge ou à la fermeture, l'aperçu est supprimé et le commentaire le signale.
  La production est publiée par `deploy-pages.yml` à la racine de la branche `gh-pages` (Pages : *Deploy from a branch
  → gh-pages*), sans jamais effacer `pr-preview/` ; si cette racine est vide, `pr-preview.yml` y publie d'abord `main`.
- Les tests **figent le titre de l'accueil** (`Staff Engineer`) dans `tests/site-regression.test.mjs` et
  `tests/e2e/site-smoke.spec.mjs` : les changer avec `index.md`.
- Tout nouveau comportement reçoit un test qui **échoue sans lui** (vérifié en cassant volontairement le code).

## 4. Créer un déck Reveal.js

Guide complet : [`docs/020-presentations-reveal.md`](docs/020-presentations-reveal.md). Pour un agent :

1. **Demander le contenu** (plan, messages clés, public, durée, événement, date) avant d'écrire.
   Ne pas remplir des diapos avec des généralités.
2. Copier `_decks/000-modele-deck.md` en `_decks/NNN-slug.md` (NNN = prochain multiple de 10), retirer `published: false`.
3. Front matter obligatoire : `title`, `slug`, `date`, `description`. Utiles : `subtitle`, `event`, `tags`, `thumbnail`.
4. La diapo de titre et la diapo « Merci » sont **générées** : ne pas les écrire.
5. Une diapo par bloc séparé par `---`. Le découpage se fait sur le `<hr />` produit par kramdown.
   Conséquence : **ne jamais utiliser `---` ni `<hr>` pour un trait décoratif dans une diapo**.
6. Densité, pour un canevas de 1280×720 et une police de 35 px :
   - au plus 6 puces par diapo ;
   - un bloc de code de 15 lignes maximum ;
   - un titre `##` par diapo.
   Au-delà, découper ou passer en fragments (`{: .fragment}`).
7. Le HTML dans le Markdown exige `markdown="1"` pour que kramdown traite l'intérieur
   (`<div class="columns" markdown="1">`, `<aside class="notes" markdown="1">`).
8. Classes disponibles : `.columns`, `.card`, `.tag`, `.fragment`, `aside.notes`. Couleurs : uniquement via les
   variables de `design-tokens.css`, jamais de nouvelle couleur en dur.
9. `npm run test:site` : le test « every published deck renders » couvre chaque déck publié.
10. Reveal.js est épinglé en **5.2.1** (jsDelivr) dans `_layouts/deck.html`. Ne pas changer de version majeure sans
    revérifier `assets/css/reveal-tech-glass.css`.

## 5. Blog et partage LinkedIn

- Guide : [`docs/010-blog-ecrire-un-article.md`](docs/010-blog-ecrire-un-article.md).
- **LinkedIn ne permet pas de pré-remplir le texte d'un post via un lien** (seul `url` est accepté par
  `share-offsite`). Le bouton copie `linkedin_text` dans le presse-papiers puis ouvre LinkedIn. Ne pas re-promettre
  un pré-remplissage.
- La carte d'aperçu LinkedIn vient de `_includes/head-extra.html` (Open Graph). Image par défaut :
  `assets/img/og-default.png` (1200×630). Après publication, LinkedIn met la carte en cache : Post Inspector pour
  rafraîchir.
- `window.open(..., 'noopener')` renvoie **toujours `null`** : impossible de détecter un pop-up bloqué, ne pas
  afficher d'erreur sur cette base.

## 6. Pièges déjà rencontrés

| Piège | Bonne pratique |
|---|---|
| Réécrire un JSON avec `json.dump` reformate tout le fichier (diff illisible) | Modifier `_data/*.json` par édition ciblée, puis valider (`python3 -c "import json; json.load(open(...))"`) |
| Du HTML de page dans un `.md` : kramdown ne traite pas le Markdown à l'intérieur des blocs HTML | Mettre la mise en page dans `_layouts/*.html`, garder le `.md` pour le front matter et le texte |
| `divided_by` : division entière dans Jekyll, réelle dans liquidjs | Déjà compensé dans `liquid-env.mjs` |
| `page.url contains 'presentations'` est vrai sur `/presentations-catalog.html` **et** `/presentations/<id>/` | En tenir compte pour l'état actif du menu |
| Version d'un CDN non épinglée | Toujours une version exacte (`reveal.js@5.2.1`) |
| Action GitHub encore en Node 20 : avertissement « Node.js 20 is deprecated » à chaque run | Versions Node 24 (`checkout`/`setup-node`/`upload-artifact` ≥ v5, `github-pages-deploy-action` ≥ v4.9, `sticky-pull-request-comment` ≥ v3) ; vérifié par `tests/site-regression.test.mjs` |
| Lien interne en dur (`href="/assets/…"`) : l'aperçu de PR (servi sous `/pr-preview/pr-N/`) charge alors la production | `{{ '/chemin' \| relative_url }}` ou `{% link page.md %}` ; vérifié par `tests/render/baseurl.test.mjs` |
| Le filtre « Tech Lead » de `brag.md` n'a plus d'entrée (`impact.type: techleader`) | Connu, laissé tel quel (historique) |

## 7. Environnement d'exécution des agents

Dans les sessions cloud, l'accès réseau passe par une liste blanche. npm fonctionne. RubyGems, Docker et le
téléchargement des navigateurs Playwright sont souvent bloqués. L'accès GitHub peut être en **lecture seule** : dans ce
cas, livrer des patchs `git format-patch` numérotés (`010-…`, `020-…`), testés avec `git am` sur un clone propre.

# Charte Graphique Liquid Glass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mettre a jour la charte visuelle du site pour converger vers un style inspire des presentations (Gaia/invert + accents techniques) avec une couche glass moderne et reusable.

**Architecture:** La refonte passe par des design tokens et des composants CSS centraux dans le layout, puis une migration progressive des pages (Accueil, Presentations, Brag). Les effets glass restent legers et accessibles (fallback sans blur), avec une verification mobile/desktop avant generalisation.

**Tech Stack:** Jekyll (Markdown/HTML), CSS natif, Font Awesome, GitHub Pages.

---

### Task 1: Audit visuel et baseline

**Files:**
- Modify: `DESIGN.md`
- Test: `index.md`
- Test: `presentations.md`

- [ ] **Step 1: Documenter les invariants existants**

Lister dans `DESIGN.md` les invariants a conserver: palette Gaia invert, typographie Lato/Fira Code, densite visuelle, niveaux de contraste.

- [ ] **Step 2: Capturer baseline visuelle**

Prendre des captures desktop/mobile de la home et de la page presentations pour comparaison avant/apres.

- [ ] **Step 3: Definir les anti-objectifs**

Ajouter une section "Ne pas faire" (pas de glass excessif, pas de perte de lisibilite, pas d'animations permanentes).

- [ ] **Step 4: Commit**

```bash
git add DESIGN.md
git commit -m "docs: define visual baseline and non-goals"
```

### Task 2: Tokens de charte v2

**Files:**
- Modify: `design-tokens.css`
- Test: `_layouts/default.html`

- [ ] **Step 1: Ajouter une couche de tokens glass**

Ajouter des tokens dedies:
- `--glass-bg`
- `--glass-border`
- `--glass-blur`
- `--glass-shadow`
- `--glass-highlight`
- `--motion-fast`, `--motion-medium`

- [ ] **Step 2: Ajouter un fallback sans backdrop-filter**

Definir des valeurs de repli quand `backdrop-filter` n'est pas supporte.

- [ ] **Step 3: Uniformiser contrastes et accents**

Revalider les combinaisons texte/fond sur la base du theme presentations (accent bleu + mint secondaire).

- [ ] **Step 4: Commit**

```bash
git add design-tokens.css
git commit -m "feat: add v2 visual tokens with glass layer"
```

### Task 3: Composants glass transverses

**Files:**
- Modify: `_layouts/default.html`
- Test: `index.md`
- Test: `presentations.md`

- [ ] **Step 1: Introduire classes utilitaires glass**

Ajouter:
- `.glass-surface`
- `.glass-card`
- `.glass-chip`
- `.glass-nav`

- [ ] **Step 2: Migrer la navigation**

Passer `.site-nav` en variante glass (blur doux, reflet, bordure fine) sans casser l'etat active.

- [ ] **Step 3: Ajouter micro-motions intentionnelles**

Transitions courtes au hover/focus (pas de mouvement continu): elevation, lueur border, et opacite.

- [ ] **Step 4: Commit**

```bash
git add _layouts/default.html
git commit -m "feat: add shared glass UI primitives"
```

### Task 4: Migration page Accueil

**Files:**
- Modify: `index.md`
- Test: `index.md`

- [ ] **Step 1: Migrer les cartes bento sur les classes glass**

Remplacer styles inline par classes reutilisables; harmoniser bordures/rayons/ombres.

- [ ] **Step 2: Renforcer la hierarchie typographique**

Ajuster titres, interlignage et labels pour s'aligner sur le rythme des slides.

- [ ] **Step 3: Verifier accessibilite**

Confirmer contraste des textes secondaires et focus clavier visibles.

- [ ] **Step 4: Commit**

```bash
git add index.md
git commit -m "feat: migrate homepage to glass design language"
```

### Task 5: Migration page Presentations

**Files:**
- Modify: `presentations.md`
- Test: `presentations.md`
- Test: `_data/presentations.yml`

- [ ] **Step 1: Harmoniser les project-card**

Appliquer le meme systeme glass (card, tags, badges statut prive/public).

- [ ] **Step 2: Ajouter indicateurs meta visuels**

Afficher `source_commit` et un badge "Maj" discret.

- [ ] **Step 3: Uniformiser CTA**

Normaliser style des liens Ouvrir (icones, contrastes, focus).

- [ ] **Step 4: Commit**

```bash
git add presentations.md
git commit -m "feat: align presentations catalog with glass charter"
```

### Task 6: Validation responsive et performance

**Files:**
- Modify: `_layouts/default.html`
- Test: `index.md`
- Test: `presentations.md`

- [ ] **Step 1: Ajuster breakpoints mobile**

Verifier la nav, les cartes et le hero entre 360px et 768px.

- [ ] **Step 2: Limiter les couts de rendu**

Limiter les zones floutees simultanees; reduire ombres lourdes sur mobile.

- [ ] **Step 3: Smoke tests navigateur**

Tester Safari/Chrome (desktop + mobile emulator) et valider lisibilite.

- [ ] **Step 4: Commit**

```bash
git add _layouts/default.html index.md presentations.md
git commit -m "perf: optimize glass effects for responsive rendering"
```

### Task 7: Documentation et runbook

**Files:**
- Modify: `DESIGN.md`
- Modify: `README.md`

- [ ] **Step 1: Mettre a jour DESIGN.md**

Ajouter section "Charte v2" avec tokens, composants, exemples et do/don't.

- [ ] **Step 2: Mettre a jour README.md**

Documenter le workflow de verification visuelle et les points de controle avant merge.

- [ ] **Step 3: Commit**

```bash
git add DESIGN.md README.md
git commit -m "docs: document visual charter v2 and validation workflow"
```

### Task 8: Livraison incrémentale

**Files:**
- Test: `index.md`
- Test: `presentations.md`

- [ ] **Step 1: Ouvrir une PR dediee "charte-v2"**

Inclure captures avant/apres et checklist accessibilite.

- [ ] **Step 2: Definir un rollback simple**

Conserver une branche taggee pre-charte-v2 pour retour rapide.

- [ ] **Step 3: Publier par phases**

Phase 1: nav + cards, Phase 2: hero + animations, Phase 3: ajustements details.

- [ ] **Step 4: Commit final de release notes**

```bash
git add DESIGN.md README.md
git commit -m "chore: prepare rollout notes for visual charter v2"
```

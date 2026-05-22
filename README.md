# SebastienDegodez.github.io

## Synchronisation automatique des presentations

Le workflow GitHub Actions `.github/workflows/sync-presentations.yml` automatise la publication des presentations depuis:

- `SebastienDegodez/meetup-coding-with-ai`
- `SebastienDegodez/skraft-plugin`

### Prerequis

- Creer un secret de repository: `REPO_READ_TOKEN`
- Ce token doit avoir acces en lecture aux depots prives sources

### Execution

- Automatique chaque jour (cron)
- Manuelle via `workflow_dispatch` avec refs personnalisables (`meetup_ref`, `skraft_ref`)

### Local

Pour synchroniser en local:

```bash
bash scripts/sync-presentations.sh
```

## Tests anti-derive du site

Une suite de tests locale verifie les contrats critiques du site pour detecter une derive structurelle:

- identite et blocs critiques de la page d'accueil
- presence de la structure de layout (navigation + design tokens)
- rendu catalogue base sur `_data/presentations.yml`
- coherence entre `_data/presentations.yml` et les fichiers publies dans `presentations/`

### Lancer les tests en local

```bash
npm install
npm run test:site
```

## Pipeline Pull Request

Le workflow `.github/workflows/site-regression.yml` execute ces tests a chaque Pull Request vers `main`.
Si les contrats critiques derivent, la PR est bloquee.
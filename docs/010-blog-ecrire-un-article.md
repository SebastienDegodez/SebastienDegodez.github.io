# Écrire un article de blog

## En 5 étapes

1. **Copier le modèle** `_blog/000-modele-article.md` en `_blog/NNN-mon-sujet.md`.
   `NNN` = numéro suivant, par pas de 10 (`010`, `020`, `030`…) pour pouvoir en intercaler un plus tard.
2. **Retirer** la ligne `published: false` et les commentaires du front matter.
3. **Renseigner** `title`, `slug`, `date`, `description`, `tags`, `linkedin_text`.
4. **Écrire** en Markdown sous le front matter.
5. **Prévisualiser** (commande dans [`AGENT.md`](../AGENT.md)), puis ouvrir une Pull Request.
   La CI (`Site Regression`) vérifie le nommage, le front matter et le build.

## Front matter

| Clé | Rôle |
|---|---|
| `title` | Titre affiché et titre de la carte LinkedIn |
| `slug` | Fin de l'URL : `/blog/<slug>/` (minuscules, chiffres, tirets) |
| `date` | `AAAA-MM-JJ`, sert au tri (plus récent en premier) |
| `description` | Sous-titre de l'article **et** description de la carte LinkedIn |
| `tags` | Puces sous le titre ; hashtags par défaut du post LinkedIn |
| `linkedin_text` | Texte du post LinkedIn (voir ci-dessous) |
| `image` | Optionnel. Visuel de la carte LinkedIn, 1200×630. Défaut : `assets/img/og-default.png` |

## Partage LinkedIn

Chaque article se termine par un bouton **Partager sur LinkedIn**. Un clic :

1. copie `linkedin_text` dans le presse-papiers (le lecteur peut le modifier avant, dans « Voir ou modifier le texte ») ;
2. ouvre LinkedIn avec l'URL de l'article.

Il ne reste qu'à coller le texte. **Pourquoi pas de texte pré-rempli ?** Le lien de partage de LinkedIn n'accepte que
l'URL ; la copie dans le presse-papiers est la voie fiable.

À savoir :

- **Ne pas mettre le lien dans `linkedin_text`** : LinkedIn ajoute lui-même la carte de l'article (titre, description,
  image), construite à partir des balises Open Graph (`_includes/head-extra.html`).
- Sans `linkedin_text`, le texte par défaut est : titre, description, puis les `tags` en hashtags.
- Après publication, si la carte n'est pas à jour (titre ou image modifiés), la rafraîchir avec le
  [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/).

## Fichiers concernés

| Fichier | Rôle |
|---|---|
| `_blog/NNN-slug.md` | Les articles (collection Jekyll `blog`) |
| `blog/index.md` + `_layouts/blog-index.html` | Page `/blog/` (liste des articles) |
| `_layouts/post.html` | Mise en page d'un article |
| `_includes/share-linkedin.html` + `assets/js/share-linkedin.js` | Bouton de partage |
| `_includes/head-extra.html` | Balises Open Graph et lien du flux RSS |
| `assets/css/blog.css` | Style des articles et du bloc de partage |
| `feed.xml` | Flux RSS : `/feed.xml` |

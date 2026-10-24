# Créer une présentation (Reveal.js)

Deux familles de présentations cohabitent sur la page [Presentations](../presentations.md) :

| | Nouvelles présentations | Présentations synchronisées |
|---|---|---|
| Dossier source | `_decks/NNN-slug.md` | `presentations/` (**généré**, ne pas toucher) |
| Moteur | Reveal.js 5.2.1, thème Tech Glass | HTML autonome, un fichier par deck |
| URL | `/slides/<slug>/` | `/presentations/<id>/` |
| Alimentation | Écrite dans ce dépôt, en Markdown | `scripts/sync-presentations.sh` (copie nocturne depuis `skraft-plugin`, `meetup-coding-with-ai`) |

> ⚠ `presentations/` est **supprimé puis recréé** à chaque synchronisation. Une présentation écrite à la main
> dans ce dossier serait perdue. Les nouvelles présentations vivent dans `_decks/`.

## En 4 étapes

1. **Copier** `_decks/000-modele-deck.md` en `_decks/NNN-mon-sujet.md` (`NNN` par pas de 10 : `010`, `020`…).
2. **Retirer** `published: false` et renseigner `title`, `subtitle`, `slug`, `date`, `event`, `description`, `tags`.
3. **Écrire** les diapos en Markdown.
4. **Prévisualiser**, puis ouvrir une Pull Request.

La **diapo de titre** (titre, sous-titre, événement, date, ton nom et ton rôle depuis `_data/author.yml`) et la
**diapo « Merci »** sont générées. Pour supprimer la seconde : `end_slide: false`.

## Syntaxe des diapos

| Besoin | Écriture |
|---|---|
| Nouvelle diapo | Une ligne `---` |
| Apparition au clic | Ligne `{: .fragment}` juste avant le paragraphe |
| Carte « verre » | Ligne `{: .card}` juste après le paragraphe |
| Deux colonnes | `<div class="columns" markdown="1">` contenant deux `<div markdown="1">` |
| Pastille | `<span class="tag">.NET</span>` |
| Code | Bloc ``` avec le langage ; coloration automatique |
| Notes de l'orateur | `<aside class="notes" markdown="1">…</aside>` (touche **S** pour la vue présentateur) |

Le modèle `_decks/000-modele-deck.md` contient un exemple de chaque.

## Prévisualiser

Même commande que dans [`AGENT.md`](../AGENT.md), avec `--unpublished` pour voir aussi le modèle :

```bash
docker run --rm -v "$PWD:/srv/jekyll" -p 4000:4000 -p 35729:35729 --entrypoint bash jekyll/jekyll -c "gem install webrick && jekyll serve --livereload --unpublished --host 0.0.0.0"
```

Puis ouvrir `http://localhost:4000/slides/<slug>/`.

**Sans rien installer, depuis une Pull Request** : chaque PR est publiée sur
`https://sebastiendegodez.github.io/pr-preview/pr-<numéro>/`. Un commentaire unique sur la PR donne ce lien et le lien
direct de chaque présentation modifiée (`…/pr-preview/pr-<numéro>/slides/<slug>/`) ; il est mis à jour à chaque push,
et l'aperçu est supprimé au merge ou à la fermeture. Dans un deck, les liens internes passent
par `relative_url` (`{{ '/assets/img/…' | relative_url }}`) pour rester dans cet aperçu.

## Présentation HTML autonome

Un deck déjà écrit en HTML autonome (sa propre mise en page, son JavaScript) peut être publié **tel quel** dans la même
galerie : `_decks/NNN-slug.html`, avec le front matter habituel plus `layout: none` (pas `null`, ignoré à cause du layout par défaut des decks), et le HTML entouré de
`{% raw %}` … `{% endraw %}` pour que Liquid n'y touche pas. Ses images vont dans `assets/img/decks/<slug>/` et sont
référencées en relatif depuis `/slides/<slug>/` (`../../assets/img/decks/<slug>/…`), pour fonctionner aussi dans
l'aperçu de PR. Exemple : `_decks/010-arazzo.html`.

## Export PDF

Ouvrir `/slides/<slug>/?print-pdf` dans Chrome, puis Imprimer → Enregistrer au format PDF (marges : aucune, fonds activés).

## Partage

L'URL d'une présentation s'affiche dans LinkedIn avec une carte (titre, description, image Open Graph). Le bouton de
copie du texte du post n'existe que sur les articles de blog : voir [`010-blog-ecrire-un-article.md`](010-blog-ecrire-un-article.md).

## À savoir

- Reveal.js est chargé depuis jsDelivr en version **épinglée 5.2.1** (`_layouts/deck.html`). Passer à une autre version
  majeure demande de revérifier le thème (`assets/css/reveal-tech-glass.css`).
- Le thème lit les variables de `design-tokens.css` : changer la palette du site change aussi les présentations.
- Les anciennes présentations synchronisées gardent leur propre style ; les porter vers Reveal est un chantier à part.

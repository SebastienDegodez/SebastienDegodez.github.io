---
# MODÈLE DE PRÉSENTATION — copier ce fichier en _decks/NNN-mon-sujet.md (NNN = numéro suivant : 010, 020, 030…)
# `published: false` : n'apparaît pas sur le site. Retirer la ligne dans la copie.
# Pour voir ce modèle en local : jekyll serve --unpublished (voir docs/020-presentations-reveal.md).
published: false

title: Titre de la présentation               # diapo de titre + carte LinkedIn
subtitle: Une phrase d'accroche                # diapo de titre
slug: titre-de-la-presentation                # URL : /slides/titre-de-la-presentation/
date: 2026-10-23                              # AAAA-MM-JJ, affichée et utilisée pour le tri
event: Devoxx France 2027                     # optionnel : nom de l'événement
description: Résumé en une ou deux phrases pour la galerie et la carte LinkedIn.
tags: [skraft, Microcks]
# thumbnail: /assets/img/decks/mon-deck.png    # optionnel : vignette 16:9 pour la galerie
# end_slide: false                            # optionnel : supprime la diapo « Merci » finale
---

La diapo de titre (titre, sous-titre, événement, date, ton nom et ton rôle) et la diapo « Merci » sont
**générées automatiquement**. Ce texte-ci est la première diapo de contenu.

---

## Une diapo = un bloc séparé par `---`

- Des listes à puces
- Du **gras**, de l'*italique*, du `code` en ligne

{: .fragment}
Cette ligne apparaît au clic (fragment).

---

## Du code

```csharp
public sealed record Greeting(string Name)
{
    public string Say() => $"Bonjour {Name}";
}
```

---

## Deux colonnes et une carte

<div class="columns" markdown="1">

<div markdown="1">

### À gauche

- un point
- un autre point

</div>

<div markdown="1">

### À droite

Une phrase mise en valeur.
{: .card}

</div>

</div>

<aside class="notes" markdown="1">
Notes de l'orateur : visibles dans la vue présentateur (touche S), jamais projetées.
</aside>

---
# MODÈLE D'ARTICLE — copier ce fichier en _blog/NNN-mon-sujet.md (NNN = numéro suivant : 010, 020, 030…)
# `published: false` : ce fichier n'apparaît jamais sur le site. Retirer la ligne (ou la passer à true) dans la copie.
published: false

title: Titre de l'article                     # affiché en grand et dans l'aperçu LinkedIn
slug: titre-de-l-article                      # fin de l'URL : /blog/titre-de-l-article/
date: 2026-10-23                              # AAAA-MM-JJ ; sert au tri (plus récent en premier)
description: Une ou deux phrases qui donnent envie de lire.   # sous-titre + description de la carte LinkedIn
tags: [skraft, Microcks]                      # puces sous le titre, et hashtags par défaut du post LinkedIn
# image: /assets/img/blog/mon-article.png      # optionnel : visuel de la carte LinkedIn (1200×630). Sinon : image par défaut.
linkedin_text: |
  Texte du post LinkedIn, tel qu'il sera copié dans le presse-papiers.

  Écrire ici l'accroche, deux ou trois idées fortes, une question pour lancer la discussion.
  Ne pas mettre le lien : LinkedIn ajoute lui-même la carte de l'article.

  #skraft #Microcks
---

Introduction : une ou deux phrases pour situer le sujet.

## Un titre de section

Du texte avec du **gras**, de l'*italique* et un [lien](https://sebastiendegodez.github.io).

- une liste
- avec des puces

### Un sous-titre

```csharp
// Les blocs de code sont mis en forme automatiquement
public sealed record Greeting(string Name);
```

> Une citation ou un point d'attention.

| Colonne A | Colonne B |
|-----------|-----------|
| un tableau | fonctionne aussi |

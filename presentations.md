---
layout: default
title: Présentations
permalink: /presentations-catalog.html
---

<header class="page-header">
  <div class="page-header__bg" role="presentation" aria-hidden="true"></div>
  <div class="page-header__content" markdown="1">

<p class="page-header__eyebrow">Knowledge Hub</p>

# Présentations
{: .page-header__title}

Catalogues publiés depuis mes autres projets. Cette page est alimentée par un script de synchronisation local.
{: .page-header__subtitle}

  </div>
</header>

{% include decks-gallery.html %}

<section class="section" aria-labelledby="presentations-title">
  <div class="section__header" markdown="1">

## Bibliothèque de slides
{: #presentations-title .section__title}

Chaque carte pointe vers la version publiée sur ce site et affiche la dernière mise à jour du fichier source.
{: .section__subtitle}

  </div>

  <div class="project-list">
    {% for presentation in site.data.presentations %}
    <article class="project-card">
      <div>
        <h3 class="project-card__name">{{ presentation.title }}</h3>
        <div class="project-card__desc">
          Projet source : <strong>{{ presentation.project }}</strong><br/>
          Fichier source : <code>{{ presentation.source_path }}</code>
        </div>
        <div class="project-card__tags">
          <span class="tag">{{ presentation.source_repository }}</span>
          {% if presentation.visibility == "private" %}
          <span class="tag tag--orange">source privée</span>
          {% else %}
          <span class="tag tag--green">source publique</span>
          {% endif %}
        </div>
      </div>
      <div class="project-card__side">
<<<<<<< HEAD
        <div class="project-card__date">Mise à jour : {{ presentation.updated_at }}</div>
=======
        <div class="project-card__date">Maj source: {{ presentation.updated_at }}</div>
>>>>>>> origin/main
        <a class="project-card__link" href="{{ presentation.url | relative_url }}" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Ouvrir
        </a>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

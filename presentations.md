---
layout: default
title: Presentations
permalink: /presentations-catalog.html
---

<header class="page-header">
  <div class="page-header__bg" role="presentation" aria-hidden="true"></div>
  <div class="page-header__content" markdown="1">

<p class="page-header__eyebrow">Knowledge Hub</p>

# Presentations
{: .page-header__title}

Catalogues publies depuis mes autres projets. Cette page est alimentee par un script de synchronisation local.
{: .page-header__subtitle}

  </div>
</header>

<section class="section" aria-labelledby="presentations-title">
  <div class="section__header" markdown="1">

## Bibliotheque de slides
{: #presentations-title .section__title}

Chaque carte pointe vers la version publiee sur ce site et affiche la derniere mise a jour du fichier source.
{: .section__subtitle}

  </div>

  <div class="project-list">
    {% for presentation in site.data.presentations %}
    <article class="project-card">
      <div>
        <h3 class="project-card__name">{{ presentation.title }}</h3>
        <div class="project-card__desc">
          Projet source: <strong>{{ presentation.project }}</strong><br/>
          Fichier source: <code>{{ presentation.source_path }}</code>
        </div>
        <div class="project-card__tags">
          <span class="tag">{{ presentation.source_repository }}</span>
          {% if presentation.visibility == "private" %}
          <span class="tag tag--orange">source privee</span>
          {% else %}
          <span class="tag tag--green">source publique</span>
          {% endif %}
        </div>
      </div>
      <div class="project-card__side">
        <div class="project-card__date">Maj source: {{ presentation.updated_at }}</div>
        <a class="project-card__link" href="{{ presentation.url }}" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Ouvrir
        </a>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

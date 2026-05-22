---
layout: default
title: Brag Document
---

<!-- PAGE HEADER -->
<header class="page-header">
  <div class="page-header__bg" role="presentation" aria-hidden="true"></div>
  <div class="page-header__content">
    <p class="page-header__eyebrow"><i class="fa-solid fa-trophy" aria-hidden="true"></i> Réalisations & Impact</p>
    <h1 class="page-header__title">Brag Document</h1>
    <p class="page-header__subtitle">Projets majeurs, contributions open source, conférences & publications, mentoring — organisés par impact et thème, pas par date.</p>
  </div>
</header>

<!-- TABLE DES MATIÈRES -->
<nav class="toc" aria-label="Sections">
  <ul class="toc__list">
    <li><a href="#projects"><i class="fa-solid fa-rocket" aria-hidden="true"></i> Projets majeurs</a></li>
    <li><a href="#opensource"><i class="fa-brands fa-github" aria-hidden="true"></i> Open Source & Communauté</a></li>
    <li><a href="#talks"><i class="fa-solid fa-microphone" aria-hidden="true"></i> Talks & Publications</a></li>
    <li><a href="#mentoring"><i class="fa-solid fa-people-group" aria-hidden="true"></i> Mentoring & Leadership</a></li>
  </ul>
</nav>

<main>

<!-- ── PROJETS MAJEURS ─────────────────────────────────── -->
<section class="section" id="projects" aria-labelledby="projects-title">
<div class="section__header" markdown="1">

<p class="section__eyebrow"><i class="fa-solid fa-rocket" aria-hidden="true"></i> Impact produit & technique</p>

<h2 id="projects-title" class="section__title">Projets <span>majeurs</span></h2>

<p class="section__subtitle">Réalisations ayant eu un impact significatif sur les produits, les équipes ou les organisations.</p>
</div>
<div class="project-list">
{% assign projects_sorted = site.data.brag.projects | sort: "sort_key" | reverse %}
{% for project in projects_sorted %}
<div class="project-card">
<div class="project-card__main">
<h3>{{ project.title }}</h3>
<div class="project-card__impact"><i class="{{ project.impact.icon }}" aria-hidden="true"></i> {{ project.impact.text }}</div>
{% for paragraph in project.paragraphs %}
<p>{{ paragraph }}</p>
{% endfor %}
<div class="project-card__tags">
{% for tag in project.tags %}
<span class="{{ tag.class | default: 'tag' }}">{{ tag.label }}</span>
{% endfor %}
</div>
</div>
<div class="project-card__side">
{% if project.date_lines %}
{% for line in project.date_lines %}
<span class="project-card__date">{{ line }}</span>
{% endfor %}
{% elsif project.date %}
<span class="project-card__date">{{ project.date }}</span>
{% endif %}
{% for link in project.links %}
<a class="project-card__link" href="{{ link.url }}" target="_blank" rel="noopener"><i class="{{ link.icon }}" aria-hidden="true"></i> {{ link.label }}</a>
{% endfor %}
</div>
</div>
{% endfor %}

</div>
</section>

<!-- ── OPEN SOURCE & COMMUNAUTÉ ───────────────────────── -->
<section class="section" id="opensource" aria-labelledby="opensource-title">
<div class="section__header" markdown="1">

<p class="section__eyebrow"><i class="fa-brands fa-github" aria-hidden="true"></i> Open Source & Communauté</p>

<h2 id="opensource-title" class="section__title">Contributions <span>open source</span></h2>

<p class="section__subtitle">Projets publiés, contributions à l'écosystème et engagement dans la communauté .NET.</p>
</div>
<div class="project-list">
{% assign opensource_sorted = site.data.brag.opensource | sort: "sort_key" | reverse %}
{% for item in opensource_sorted %}
<div class="project-card">
<div class="project-card__main">
<h3>{{ item.title }}</h3>
<div class="project-card__impact"><i class="{{ item.impact.icon }}" aria-hidden="true"></i> {{ item.impact.text }}</div>
{% for paragraph in item.paragraphs %}
<p>{{ paragraph }}</p>
{% endfor %}
<div class="project-card__tags">
{% for tag in item.tags %}
<span class="{{ tag.class | default: 'tag' }}">{{ tag.label }}</span>
{% endfor %}
</div>
</div>
<div class="project-card__side">
{% if item.date %}
<span class="project-card__date">{{ item.date }}</span>
{% endif %}
{% for link in item.links %}
<a class="project-card__link" href="{{ link.url }}" target="_blank" rel="noopener"><i class="{{ link.icon }}" aria-hidden="true"></i> {{ link.label }}</a>
{% endfor %}
</div>
</div>
{% endfor %}

</div>
</section>

<!-- ── TALKS & PUBLICATIONS ──────────────────────────── -->
<section class="section" id="talks" aria-labelledby="talks-title">
<div class="section__header" markdown="1">

<p class="section__eyebrow"><i class="fa-solid fa-microphone" aria-hidden="true"></i> Conférences & Partage</p>

<h2 id="talks-title" class="section__title">Talks & <span>Publications</span></h2>

<p class="section__subtitle">Présentations en meetups, conférences et contenus publiés pour la communauté.</p>
</div>
<div class="talks-list">
{% assign talks_sorted = site.data.talks | sort: "sort_key" | reverse %}
{% for talk in talks_sorted %}
<div class="talk-card">
<div class="talk-card__icon"><i class="{{ talk.icon }}" aria-hidden="true"></i></div>
<div class="talk-card__body">
<h3>{{ talk.title }}</h3>
<p class="talk-card__meta"><strong>{{ talk.meta }}</strong></p>
<p class="talk-card__desc">{{ talk.description }}</p>
{% if talk.report_url %}
<p class="talk-card__meta">
  <a class="project-card__link" href="{{ talk.report_url }}" target="_blank" rel="noopener">
    <i class="fa-brands fa-linkedin" aria-hidden="true"></i> Retour d'expérience (LinkedIn)
  </a>
</p>
{% endif %}
<div class="talk-card__tags">
<span class="tag--orange tag">{{ talk.category }}</span>
{% for t in talk.tags %}<span class="tag">{{ t }}</span>{% endfor %}
</div>
</div>
</div>
{% endfor %}

</div>
</section>

<!-- ── MENTORING & LEADERSHIP ─────────────────────────── -->
<section class="section" id="mentoring" aria-labelledby="mentoring-title">
<div class="section__header" markdown="1">

<p class="section__eyebrow"><i class="fa-solid fa-people-group" aria-hidden="true"></i> Impact humain & organisationnel</p>

<h2 id="mentoring-title" class="section__title">Mentoring & <span>Leadership</span></h2>

<p class="section__subtitle">Accompagnement des équipes, transmission de compétences et animation de la culture technique.</p>
</div>
<div class="mentoring-grid">
{% for item in site.data.brag.mentoring %}
<div class="mentoring-card">
<p class="mentoring-card__icon"><i class="{{ item.icon }}" aria-hidden="true"></i></p>
<h3>{{ item.title }}</h3>
{% for paragraph in item.paragraphs %}
<p>{{ paragraph }}</p>
{% endfor %}
</div>
{% endfor %}

</div>
</section>

</main>

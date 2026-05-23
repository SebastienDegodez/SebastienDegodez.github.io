---
layout: default
title: Accueil
---

<!-- HERO — Executive Summary -->
<header class="hero">
  <div class="hero__bg" role="presentation" aria-hidden="true"></div>
  <div class="hero__content">

<img class="hero__avatar" src="https://raw.githubusercontent.com/SebastienDegodez/slide-marp/refs/heads/main/presentation/images/me.png" alt="Photo de Sébastien Degodez" />

<h1>DEGODEZ Sébastien</h1>

<p class="hero__role"><i class="fa-solid fa-briefcase" aria-hidden="true"></i> Tech Lead · AXA France</p>

<p class="hero__tagline"><em>Tech Lead & Software Engineer @ AXA France depuis juin 2023. Architecte de solutions .NET, contributeur open source & speaker communautaire passionné par les LLMs et les outils pour développeurs.</em></p>

<nav class="hero__links" aria-label="Liens rapides">
  <a href="{% link brag.md %}" class="hero__links--cta"><i class="fa-solid fa-star" aria-hidden="true"></i> Brag Document</a>
  <a href="https://github.com/SebastienDegodez" target="_blank" rel="noopener"><i class="fa-brands fa-github" aria-hidden="true"></i> GitHub</a>
  <a href="https://www.linkedin.com/in/sebastien-degodez" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin" aria-hidden="true"></i> LinkedIn</a>
  <a href="https://twitter.com/seb2goxdev" target="_blank" rel="noopener"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i> seb2goxdev</a>
</nav>

  </div>
  <div class="hero__scroll-hint" aria-hidden="true">
    <i class="fa-solid fa-chevron-down"></i>
    Highlights
  </div>
</header>

<!-- BENTO BOX — Highlights -->
<main>
  <section class="bento-section" id="highlights" aria-labelledby="highlights-title">
    {% assign highlights = site.data.homepage.highlights %}
    <div class="bento-section__header">

<h2 id="highlights-title" class="bento-section__title">Points <span>forts</span></h2>

<p class="bento-section__subtitle">{{ highlights.subtitle }}</p>

    </div>

    <div class="bento-grid">
      {% for card in highlights.cards %}
      <div class="bento-card{% if card.wide %} bento-card--wide{% endif %}">
        <div class="bento-card__icon"><i class="{{ card.icon }}" aria-hidden="true"></i></div>
        <div class="bento-card__label">{{ card.label }}</div>
        <div class="bento-card__title">{{ card.title }}</div>
        <div class="bento-card__body">
      {{ card.body_html }}
        </div>
        {% if card.tags and card.tags.size > 0 %}
        <div class="bento-card__tags">
          {% for tag in card.tags %}
          <span class="{{ tag.class }}">{{ tag.text }}</span>
          {% endfor %}
        </div>
        {% endif %}
        {% if card.link %}
        <a class="bento-card__link" href="{{ card.link.href }}"{% if card.link.external %} target="_blank" rel="noopener"{% endif %}><i class="{{ card.link.icon }}" aria-hidden="true"></i> {{ card.link.text }}</a>
        {% endif %}
      </div>
      {% endfor %}

      <!-- Brag Document CTA -->
      <div class="bento-card" style="background: rgba(2, 136, 209, 0.12); border-color: rgba(2, 136, 209, 0.35);">
        <div class="bento-card__icon" style="background: rgba(2,136,209,0.2); color: var(--color-primary);">
          <i class="fa-solid fa-trophy" aria-hidden="true"></i>
        </div>
        <div class="bento-card__label">Réalisations détaillées</div>
        <div class="bento-card__title">Brag Document complet</div>
        <div class="bento-card__body">
Projets majeurs, contributions open source, talks & publications, mentoring — détaillés par impact et par thème.
        </div>
        <a class="bento-card__link" href="{% link brag.md %}" style="color: var(--color-highlight);"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i> Consulter le Brag Document</a>
      </div>

    </div>
  </section>
</main>

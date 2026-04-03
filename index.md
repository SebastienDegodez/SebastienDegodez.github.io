---
layout: default
title: Accueil
---

<!-- ============================================================
     HERO — Executive Summary
     ============================================================ -->
<header class="hero">
  <div class="hero__bg" role="presentation" aria-hidden="true"></div>
  <div class="hero__content">
    <img
      src="https://raw.githubusercontent.com/SebastienDegodez/slide-marp/refs/heads/main/presentation/images/me.png"
      alt="Photo de Sébastien Degodez"
      class="hero__avatar"
    />
    <h1>DEGODEZ Sébastien</h1>
    <p class="hero__role">
      <i class="fa-solid fa-briefcase" aria-hidden="true"></i>
      Software Engineer · AXA France
    </p>
    <p class="hero__tagline">
      Architecte de solutions .NET, contributeur open source &amp; speaker communautaire passionné par les LLMs et les outils pour développeurs.
    </p>
    <nav class="hero__links" aria-label="Liens rapides">
      <a href="{% link brag.md %}" class="hero__links--cta">
        <i class="fa-solid fa-star" aria-hidden="true"></i> Brag Document
      </a>
      <a href="https://github.com/SebastienDegodez" target="_blank" rel="noopener">
        <i class="fa-brands fa-github" aria-hidden="true"></i> GitHub
      </a>
      <a href="https://www.linkedin.com/in/sebastien-degodez" target="_blank" rel="noopener">
        <i class="fa-brands fa-linkedin" aria-hidden="true"></i> LinkedIn
      </a>
      <a href="https://twitter.com/seb2goxdev" target="_blank" rel="noopener">
        <i class="fa-brands fa-x-twitter" aria-hidden="true"></i> seb2goxdev
      </a>
    </nav>
  </div>
  <div class="hero__scroll-hint" aria-hidden="true">
    <i class="fa-solid fa-chevron-down"></i>
    Highlights
  </div>
</header>

<!-- ============================================================
     BENTO BOX — Highlights
     ============================================================ -->
<main>
  <section class="bento-section" id="highlights" aria-labelledby="highlights-title">
    <div class="bento-section__header">
      <h2 class="bento-section__title" id="highlights-title">
        Points <span>forts</span>
      </h2>
      <p class="bento-section__subtitle">Vue d'ensemble — rôle actuel, contributions &amp; talks récents.</p>
    </div>

    <div class="bento-grid">

      <!-- Rôle actuel -->
      <div class="bento-card bento-card--wide">
        <div class="bento-card__icon"><i class="fa-solid fa-building" aria-hidden="true"></i></div>
        <div class="bento-card__label">Rôle actuel</div>
        <div class="bento-card__title">Software Engineer @ AXA France</div>
        <div class="bento-card__body">
          Développement d'applications d'entreprise en .NET, conception de solutions Cloud et accompagnement technique des équipes dans l'adoption de pratiques modernes (Clean Architecture, DDD, tests automatisés).
        </div>
        <div class="bento-card__tags">
          <span class="tag">.NET</span>
          <span class="tag">C#</span>
          <span class="tag">Clean Architecture</span>
          <span class="tag">Azure</span>
          <span class="tag">DDD</span>
        </div>
      </div>

      <!-- Open Source -->
      <div class="bento-card">
        <div class="bento-card__icon"><i class="fa-brands fa-github" aria-hidden="true"></i></div>
        <div class="bento-card__label">Open Source</div>
        <div class="bento-card__title">MCP.Pack &amp; contributions communautaires</div>
        <div class="bento-card__body">
          Auteur de <strong>MCP.Pack</strong>, un pack d'outils pour le protocole MCP (Model Context Protocol). Contributions actives à l'écosystème .NET et aux outils pour développeurs.
        </div>
        <div class="bento-card__tags">
          <span class="tag--green tag">MCP</span>
          <span class="tag--green tag">OSS</span>
          <span class="tag--green tag">AI Tooling</span>
        </div>
        <a
          class="bento-card__link"
          href="https://github.com/SebastienDegodez"
          target="_blank"
          rel="noopener"
        >
          <i class="fa-brands fa-github" aria-hidden="true"></i> Voir sur GitHub
        </a>
      </div>

      <!-- Talks & communauté -->
      <div class="bento-card">
        <div class="bento-card__icon"><i class="fa-solid fa-microphone" aria-hidden="true"></i></div>
        <div class="bento-card__label">Talks récents</div>
        <div class="bento-card__title">Speaker &amp; animateur communautaire</div>
        <div class="bento-card__body">
          Présentations en conférences et meetups sur les thèmes .NET, LLMs, outils pour développeurs et bonnes pratiques d'architecture.
        </div>
        <div class="bento-card__tags">
          <span class="tag--orange tag">Meetup</span>
          <span class="tag--orange tag">Conférence</span>
          <span class="tag--orange tag">LLM</span>
        </div>
        <a class="bento-card__link" href="{% link brag.md %}#talks">
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i> Toutes les présentations
        </a>
      </div>

      <!-- Expertise technique -->
      <div class="bento-card">
        <div class="bento-card__icon"><i class="fa-solid fa-code" aria-hidden="true"></i></div>
        <div class="bento-card__label">Expertise technique</div>
        <div class="bento-card__title">Stack &amp; domaines de prédilection</div>
        <div class="bento-card__body">
          Spécialisé dans les architectures .NET modernes, l'intégration de l'IA générative dans les workflows de développement et la création d'outils CLI/SDK.
        </div>
        <div class="bento-card__tags">
          <span class="tag">.NET 8/9</span>
          <span class="tag">LLM</span>
          <span class="tag">CLI</span>
          <span class="tag">SDK</span>
        </div>
      </div>

      <!-- Mentoring -->
      <div class="bento-card">
        <div class="bento-card__icon"><i class="fa-solid fa-people-group" aria-hidden="true"></i></div>
        <div class="bento-card__label">Mentoring &amp; Leadership</div>
        <div class="bento-card__title">Accompagnement &amp; partage de connaissance</div>
        <div class="bento-card__body">
          Mentoring de développeurs juniors et mid, animation de guildes techniques, revues de code et accompagnement dans la montée en compétences des équipes.
        </div>
        <div class="bento-card__tags">
          <span class="tag--green tag">Mentoring</span>
          <span class="tag--green tag">Guilde</span>
          <span class="tag--green tag">Leadership</span>
        </div>
        <a class="bento-card__link" href="{% link brag.md %}#mentoring">
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i> En savoir plus
        </a>
      </div>

      <!-- Brag Document CTA -->
      <div class="bento-card" style="background: rgba(2, 136, 209, 0.12); border-color: rgba(2, 136, 209, 0.35);">
        <div class="bento-card__icon" style="background: rgba(2,136,209,0.2); color: var(--color-primary);">
          <i class="fa-solid fa-trophy" aria-hidden="true"></i>
        </div>
        <div class="bento-card__label">Réalisations détaillées</div>
        <div class="bento-card__title">Brag Document complet</div>
        <div class="bento-card__body">
          Projets majeurs, contributions open source, talks &amp; publications, mentoring — détaillés par impact et par thème.
        </div>
        <a class="bento-card__link" href="{% link brag.md %}" style="color: var(--color-highlight);">
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i> Consulter le Brag Document
        </a>
      </div>

    </div>
  </section>
</main>

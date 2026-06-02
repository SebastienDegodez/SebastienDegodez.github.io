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

<nav class="toc" aria-label="Plan du handbook">
  <ul class="toc__list">
    <li><a href="#phase-flow"><i class="fa-solid fa-route" aria-hidden="true"></i> HVE → BRD → PRD</a></li>
    <li><a href="#agents-skills"><i class="fa-solid fa-robot" aria-hidden="true"></i> Agents & Skills</a></li>
    <li><a href="#architecture"><i class="fa-solid fa-sitemap" aria-hidden="true"></i> Clean Architecture</a></li>
    <li><a href="#practices"><i class="fa-solid fa-dumbbell" aria-hidden="true"></i> Object Calisthenics</a></li>
    <li><a href="#adr"><i class="fa-solid fa-book-open" aria-hidden="true"></i> ADR & décisions</a></li>
    <li><a href="#deep-dives"><i class="fa-solid fa-folder-open" aria-hidden="true"></i> Sous-pages</a></li>
  </ul>
</nav>

<main>
  <section class="section" id="phase-flow" aria-labelledby="phase-flow-title">
    <div class="section__header" markdown="1">
## Handbook du workflow IA
{: #phase-flow-title .section__title}

Cette page explique le flux de travail phase par phase, comme un handbook: pourquoi chaque artefact existe, ce qu'il apporte, et comment les agents s'en servent pour livrer de façon fiable.
{: .section__subtitle}
    </div>

    <div class="project-list">
      <article class="project-card">
        <div class="project-card__main">
          <h3>1) HVE — comprendre le besoin avant toute implémentation</h3>
          <p>Le <strong>HVE</strong> (High Value Exploration) clarifie la valeur business, les risques, les hypothèses et les critères de succès. C'est la phase de cadrage qui évite de coder trop tôt.</p>
          <p><strong>Apport:</strong> langage commun entre produit, tech et design, priorités explicites, et limites du problème connues dès le départ.</p>
          <div class="project-card__tags">
            <span class="tag">Value</span><span class="tag">Scope</span><span class="tag">Risques</span>
          </div>
        </div>
      </article>

      <article class="project-card">
        <div class="project-card__main">
          <h3>2) BRD — transformer l'intention en besoins métier vérifiables</h3>
          <p>Le <strong>BRD</strong> (Business Requirements Document) formalise les exigences métier, les règles de gestion et les cas d'usage prioritaires avec une granularité exploitable.</p>
          <p><strong>Apport:</strong> source de vérité fonctionnelle pour aligner les équipes, tracer les décisions et préparer les critères d'acceptation.</p>
          <div class="project-card__tags">
            <span class="tag">Exigences</span><span class="tag">Règles métier</span><span class="tag">Traçabilité</span>
          </div>
        </div>
      </article>

      <article class="project-card">
        <div class="project-card__main">
          <h3>3) PRD — rendre l'exécution produit et technique concrète</h3>
          <p>Le <strong>PRD</strong> (Product Requirements Document) relie besoins et livraison: parcours utilisateur, contraintes techniques, qualité attendue, métriques et plan de release.</p>
          <p><strong>Apport:</strong> BRD + PRD fonctionnent ensemble pour réduire l'ambiguïté: le BRD décrit le <em>quoi</em>, le PRD explicite le <em>comment livrer</em> sans dériver de la valeur initiale.</p>
          <div class="project-card__tags">
            <span class="tag">Delivery</span><span class="tag">Qualité</span><span class="tag">Release</span>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="section" id="agents-skills" aria-labelledby="agents-skills-title">
    <div class="section__header" markdown="1">
## Apport des agents et de leurs skills
{: #agents-skills-title .section__title}

Chaque agent vise un objectif précis. Les skills apportent le contexte et les garde-fous adaptés à la phase active.
{: .section__subtitle}
    </div>
    <div class="project-list">
      <article class="project-card">
        <div class="project-card__main">
          <h3>Agent spécialiste</h3>
          <p>Produit les artefacts attendus de la phase (analyse, design, plan de tests, implémentation) avec une stratégie claire orientée résultat.</p>
        </div>
      </article>
      <article class="project-card">
        <div class="project-card__main">
          <h3>Agent reviewer</h3>
          <p>Challenge les hypothèses, détecte les incohérences et applique des lenses adversariales (fonctionnel, architecture, sécurité, opérationnel).</p>
        </div>
      </article>
      <article class="project-card">
        <div class="project-card__main">
          <h3>Skills par phase</h3>
          <p>Active uniquement les compétences utiles au moment donné (discovery, ADR, quality gates, tests) pour limiter le bruit et améliorer la précision.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="section" id="architecture" aria-labelledby="architecture-title">
    <div class="section__header" markdown="1">
## Clean Architecture comme colonne vertébrale
{: #architecture-title .section__title}

Le handbook s'appuie sur une architecture claire: domaine isolé, cas d'usage explicites, adaptateurs techniques à la périphérie. Cela facilite l'évolution et la revue.
{: .section__subtitle}
    </div>
    <div class="project-list">
      <article class="project-card">
        <div class="project-card__main">
          <h3>Pourquoi c'est clé</h3>
          <p>Quand les responsabilités sont nettes, les agents peuvent contribuer sans casser le modèle métier: moins de dérive, plus de lisibilité, meilleure maintenabilité.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="section" id="practices" aria-labelledby="practices-title">
    <div class="section__header" markdown="1">
## Object Calisthenics pour garder un code pilotable
{: #practices-title .section__title}

Les règles Object Calisthenics imposent une discipline utile pour les humains et pour l'IA: petites unités, intention claire, modèle métier explicite.
{: .section__subtitle}
    </div>
    <div class="project-list">
      <article class="project-card">
        <div class="project-card__main">
          <h3>Bénéfice direct</h3>
          <p>Moins d'effets de bord, relecture plus simple, et génération de code plus fiable car les contraintes sont explicites.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="section" id="adr" aria-labelledby="adr-title">
    <div class="section__header" markdown="1">
## ADR, décisions d'architecture et historique
{: #adr-title .section__title}

Chaque choix structurant est documenté dans des ADR pour préserver le contexte décisionnel, faciliter les revues et accélérer l'onboarding.
{: .section__subtitle}
    </div>
    <div class="project-list">
      <article class="project-card">
        <div class="project-card__main">
          <h3>Traçabilité opérationnelle</h3>
          <p>Les ADR relient les décisions aux contraintes du moment. On sait pourquoi une direction a été prise, quand la reconsidérer, et comment la faire évoluer proprement.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="section" id="deep-dives" aria-labelledby="deep-dives-title">
    <div class="section__header" markdown="1">
## Sous-pages pour aller en détail
{: #deep-dives-title .section__title}

Cette page reste volontairement compacte. Les détails sont répartis en sous-pages pour garder une lecture fluide.
{: .section__subtitle}
    </div>
    <div class="project-list">
      <article class="project-card">
        <div class="project-card__main">
          <h3>Workflow agents et gouvernance</h3>
          <p><a href="/presentations/skraft-agents/" target="_blank" rel="noopener">Voir la présentation skraft-agents</a> pour la vue détaillée des rôles, gates et contrats.</p>
        </div>
      </article>
      <article class="project-card">
        <div class="project-card__main">
          <h3>Impacts, résultats et exemples concrets</h3>
          <p><a href="{% link brag.md %}">Consulter le Brag Document</a> pour les livrables, réalisations et preuves d'impact.</p>
        </div>
      </article>
      <article class="project-card">
        <div class="project-card__main">
          <h3>Catalogue de contenus</h3>
          <p><a href="/presentations-catalog.html">Accéder au catalogue des présentations</a> pour les ressources complémentaires par thème.</p>
        </div>
      </article>
    </div>
  </section>

  <section class="section" id="technical-improvements" aria-labelledby="technical-improvements-title">
    <div class="section__header" markdown="1">
## Améliorations techniques du site
{: #technical-improvements-title .section__title}

Améliorations de lisibilité et d'expérience utilisateur sur le rendu de la documentation.
{: .section__subtitle}
    </div>
    <div class="project-list">
      <article class="project-card">
        <div class="project-card__main">
          <h3>Messages d'erreur Mermaid rendus compréhensibles</h3>
          <p>Les messages techniques bruts comme <code>Syntax error in text</code> (Mermaid 10.9.6) sont remplacés par une explication lisible qui aide à corriger la définition du diagramme.</p>
        </div>
      </article>
    </div>
  </section>
</main>

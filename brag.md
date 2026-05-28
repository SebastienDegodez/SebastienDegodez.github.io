---
layout: default
title: Brag Document
---

<!-- PAGE HEADER -->
<style>
.project-card__header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.project-card__header-flex h3 {
  margin-bottom: 0; /* Override default to let flexbox handle spacing */
}
.filters-wrapper {
  position: sticky;
  top: 1rem;
  z-index: 100;
  max-width: 1100px;
  margin: 0 auto 2rem auto;
  box-sizing: border-box;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 0.8rem 2rem; /* Aligné sur les sections */
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.brag-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0 !important;
  justify-content: flex-start;
}
.brag-filters span {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-foreground);
  margin-right: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}
.filter-btn {
  background: rgba(255,255,255,0.05);
  color: var(--color-foreground);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all var(--motion-fast);
  font-weight: 600;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.filter-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: var(--glass-border-strong);
}
.filter-btn.active {
  background: var(--color-primary);
  color: var(--color-dark);
  border-color: var(--color-primary);
}
.tag-filter-btn.active {
  background: rgba(255, 167, 38, 0.2);
  color: #ffca28;
  border-color: rgba(255, 167, 38, 0.5);
}
.project-card {
  transition: opacity 300ms ease, filter 300ms ease, transform 300ms ease;
}
.filtered-out {
  opacity: 0.35;
  filter: grayscale(100%);
  pointer-events: none;
}
/* Collapse content to reduce scroll for filtered items */
.filtered-out p,
.filtered-out .project-card__tags,
.filtered-out .project-card__link,
.filtered-out .talk-card__tags {
  display: none !important;
}
.filtered-out .project-card__impact {
  margin-bottom: 0;
}
.filtered-out .talk-card__body {
  padding-bottom: 0.5rem;
}
.tag-filter-btn.active {
  background: rgba(255, 167, 38, 0.15);
  color: #ffca28;
  border-color: rgba(255, 167, 38, 0.5);
  box-shadow: 0 0 15px rgba(255, 167, 38, 0.2);
}
.year-separator {
  width: 100%;
  font-size: 2rem;
  color: var(--color-primary);
  font-weight: 900;
  margin: 3rem 0 1.5rem 0;
  padding-left: 1.2rem;
  border-left: 5px solid var(--color-primary);
  text-shadow: 0 2px 10px rgba(36, 181, 255, 0.2);
}
/* ── Ongoing / En cours ──────────────────────────── */
.project-card--ongoing {
  border: 1px solid rgba(76, 175, 80, 0.4);
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.12), inset 0 0 30px rgba(76, 175, 80, 0.04);
}
.badge-ongoing {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #81c784;
  background: rgba(76, 175, 80, 0.15);
  border: 1px solid rgba(76, 175, 80, 0.35);
  border-radius: 20px;
  padding: 0.15rem 0.65rem;
  vertical-align: middle;
  margin-left: 0.5rem;
  animation: ongoing-pulse 2.5s ease-in-out infinite;
}
@keyframes ongoing-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
<header class="page-header">
  <div class="page-header__bg" role="presentation" aria-hidden="true"></div>
  <div class="page-header__content">
    <p class="page-header__eyebrow"><i class="fa-solid fa-trophy" aria-hidden="true"></i> Réalisations & Impact</p>
    <h1 class="page-header__title">Brag Document</h1>
    <p class="page-header__subtitle">Une synthèse de mes réalisations les plus significatives, de l'architecture à l'open source, illustrant mon évolution et mon impact sur l'écosystème tech.</p>
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

<!-- WRAPPER FILTRES STICKY -->
<div class="filters-wrapper">
  <!-- FILTRES D'IMPACT -->
  <div class="brag-filters impact-filters">
    <span><i class="fa-solid fa-filter"></i> Impact :</span>
    <button class="filter-btn active" data-filter="all"><i class="fa-solid fa-list-check"></i> Tous</button>
    <button class="filter-btn" data-filter="distinguished"><i class="fa-solid fa-medal"></i> Distinguished</button>
    <button class="filter-btn" data-filter="principal"><i class="fa-solid fa-crown"></i> Principal</button>
    <button class="filter-btn" data-filter="staff"><i class="fa-solid fa-map-location-dot"></i> Staff</button>
    <button class="filter-btn" data-filter="techleader"><i class="fa-solid fa-bolt"></i> Tech Lead</button>
    <button class="filter-btn" data-filter="other"><i class="fa-solid fa-code-commit"></i> Senior Software Engineer</button>
  </div>

  <!-- FILTRES DE TAGS (Generes en JS) -->
  <div class="brag-filters tag-filters" id="tag-filters-container">
    <!-- Buttons injected via JS -->
  </div>
</div>




<!-- ── PROJETS MAJEURS ─────────────────────────────────── -->
<section class="section" id="projects" aria-labelledby="projects-title">
<div class="section__header" markdown="1">

<p class="section__eyebrow"><i class="fa-solid fa-rocket" aria-hidden="true"></i> Impact produit & technique</p>

<h2 id="projects-title" class="section__title">Projets <span>majeurs</span></h2>

<p class="section__subtitle">Réalisations ayant eu un impact significatif sur les produits, les équipes ou les organisations.</p>
</div>
<div class="project-list">
{% assign projects_sorted = site.data.brag.projects | sort: "sort_key" | reverse %}
{% assign current_year = '' %}
{% for project in projects_sorted %}
{% assign project_year = project.sort_key | divided_by: 10000 %}
{% if project_year != current_year %}
<h3 class="year-separator">{{ project_year }}</h3>
{% assign current_year = project_year %}
{% endif %}
{% include brag-project-card.html project=project %}
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
{% assign current_year = '' %}
{% for item in opensource_sorted %}
{% assign item_year = item.sort_key | divided_by: 10000 %}
{% if item_year != current_year %}
<h3 class="year-separator">{{ item_year }}</h3>
{% assign current_year = item_year %}
{% endif %}
{% include brag-project-card.html project=item %}
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

<script>
document.addEventListener("DOMContentLoaded", () => {
  const impactButtons = document.querySelectorAll(".impact-filters .filter-btn");
  const tagContainer = document.getElementById("tag-filters-container");
  
  const cards = document.querySelectorAll(".project-card, .talk-card");
  const separators = document.querySelectorAll(".year-separator");

  let currentImpact = "all";
  let currentTag = "all";

  // 0. Auto-hide empty impact filters
  const impactCounts = {};
  cards.forEach(card => {
    if (card.classList.contains("project-card")) {
      const type = card.dataset.impactType;
      if (type) impactCounts[type] = (impactCounts[type] || 0) + 1;
    }
  });

  impactButtons.forEach(btn => {
    const filter = btn.dataset.filter;
    if (filter !== "all" && !impactCounts[filter]) {
      btn.style.display = "none";
    }
  });

  // 1. Gather tags
  const tagCounts = {};
  cards.forEach(card => {
    const orangeTags = card.querySelectorAll(".tag--orange");
    orangeTags.forEach(t => {
      const label = t.textContent.trim();
      tagCounts[label] = (tagCounts[label] || 0) + 1;
    });
  });

  // 2. Build tag buttons
  let tagHtml = `<span><i class="fa-solid fa-tags"></i> Tags :</span>`;
  tagHtml += `<button class="filter-btn tag-filter-btn active" data-tag="all">Tous</button>`;
  
  // Sort tags by frequency descending
  const sortedTags = Object.entries(tagCounts).sort((a,b) => b[1] - a[1]);
  sortedTags.forEach(([tag, count]) => {
    tagHtml += `<button class="filter-btn tag-filter-btn" data-tag="${tag}">${tag} (${count})</button>`;
  });
  tagContainer.innerHTML = tagHtml;

  const tagButtons = document.querySelectorAll(".tag-filter-btn");

  // 3. Central update function
  function updateFilters() {
    cards.forEach(card => {
      // Impact logic (only applies to project-card, talks are not impacted by impact filter right now)
      // wait, talks don't have impact, so they pass impact filter if we want them to stay... 
      // let's say "principal/staff" filter ONLY hides non-matching project-cards. It hides talks too?
      // "Vraiment, filtering by Staff means only staff things." so let's hide talks if impact is specific.
      const isProjectCard = card.classList.contains("project-card");
      const impactType = card.dataset.impactType || "";
      
      let passesImpact = true;
      if (currentImpact !== "all") {
        if (isProjectCard) {
          passesImpact = (impactType === currentImpact);
        } else {
          // It's a talk card, it has no impact. Hide it if an impact is selected? Yes.
          passesImpact = false;
        }
      }

      // Tag logic
      let passesTag = true;
      if (currentTag !== "all") {
        const myTags = Array.from(card.querySelectorAll(".tag--orange")).map(t => t.textContent.trim());
        passesTag = myTags.includes(currentTag);
      }

      if (passesImpact && passesTag) {
        card.classList.remove("filtered-out");
      } else {
        card.classList.add("filtered-out");
      }
    });

    // Update Year Separators (only applies to where they are used: projects & opensource)
    separators.forEach(sep => {
      let nextEl = sep.nextElementSibling;
      let hasVisibleCards = false;
      while(nextEl && !nextEl.classList.contains("year-separator") && !nextEl.classList.contains("section__header")) {
        if (nextEl.classList.contains("project-card") && !nextEl.classList.contains("filtered-out")) {
          hasVisibleCards = true;
          break;
        }
        nextEl = nextEl.nextElementSibling;
      }
      sep.style.opacity = hasVisibleCards ? "1" : "0.35";
      sep.style.display = "block"; // reset display in case it was "none"
    });

    if (currentImpact !== "all" || currentTag !== "all") {
      setTimeout(() => {
        const firstActive = document.querySelector('.project-card:not(.filtered-out), .talk-card:not(.filtered-out)');
        if (firstActive) {
          const wrapper = document.querySelector('.filters-wrapper');
          const offset = (wrapper ? wrapper.offsetHeight : 100) + 20; // espace pour la barre sticky
          
          // Vérifie si on a un year-separator juste au-dessus 
          let target = firstActive;
          const prev = firstActive.previousElementSibling;
          if (prev && prev.classList.contains("year-separator") && prev.style.opacity === "1") {
            target = prev; // on scroll au séparateur d'année c'est plus propre
          }

          const topPos = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: topPos, behavior: "smooth" });
        }
      }, 50); // léger délai pour laisser le layout se resserrer avec les display:none
    }
  }

  // 4. Attach Events
  impactButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      impactButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentImpact = btn.dataset.filter;
      updateFilters();
    });
  });

  tagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tagButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentTag = btn.dataset.tag;
      updateFilters();
    });
  });
});
</script>


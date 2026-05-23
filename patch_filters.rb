markdown_file = 'brag.md'
content = File.read(markdown_file)

# 1. Update CSS
css_updates = <<~CSS
.filter-btn {
  background: var(--glass-bg);
  color: var(--color-foreground);
  border: 1px solid var(--glass-border);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all var(--motion-fast);
  font-weight: 600;
  font-size: 0.85rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.tag-filter-btn.active {
  background: rgba(255, 167, 38, 0.15);
  color: #ffca28;
  border-color: rgba(255, 167, 38, 0.5);
  box-shadow: 0 0 15px rgba(255, 167, 38, 0.2);
}
CSS

content.sub!(/\.filter-btn \{.*?\}/m, css_updates.split("\n")[0..14].join("\n"))
content.sub!(/\.filtered-out \{.*?\}/m, ".filtered-out {\n  opacity: 0.15;\n  filter: grayscale(100%);\n  pointer-events: none;\n}\n" + css_updates.split("\n")[15..-1].join("\n"))

# 2. Add Tag Filters container
new_html = <<~HTML
<!-- FILTRES D'IMPACT -->
<div class="brag-filters impact-filters">
  <span><i class="fa-solid fa-filter"></i> Vue d'impact :</span>
  <button class="filter-btn active" data-filter="all"><i class="fa-solid fa-list-check"></i> Tous</button>
  <button class="filter-btn" data-filter="principal"><i class="fa-solid fa-crown"></i> Principal</button>
  <button class="filter-btn" data-filter="staff"><i class="fa-solid fa-map-location-dot"></i> Staff</button>
</div>

<!-- FILTRES DE TAGS (Generes en JS) -->
<div class="brag-filters tag-filters" id="tag-filters-container" style="margin-top: -1.5rem; margin-bottom: 3rem;">
  <!-- Buttons injected via JS -->
</div>
HTML

content.sub!(/<!-- FILTRES D'IMPACT -->.*?<\/div>/m, new_html)

# 3. Update JavaScript
new_js = <<~JS
<script>
document.addEventListener("DOMContentLoaded", () => {
  const impactButtons = document.querySelectorAll(".impact-filters .filter-btn");
  const tagContainer = document.getElementById("tag-filters-container");
  
  const cards = document.querySelectorAll(".project-card, .talk-card");
  const separators = document.querySelectorAll(".year-separator");

  let currentImpact = "all";
  let currentTag = "all";

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
  let tagHtml = `<span><i class="fa-solid fa-tags"></i> Sujets majeurs :</span>`;
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
      sep.style.opacity = hasVisibleCards ? "1" : "0.15";
    });
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
JS

content.sub!(/<script>.*?<\/script>/m, new_js)

File.write(markdown_file, content)
puts "Updated filters successfully"

require 'fileutils'

content = File.read("brag.md")

# Ensure CSS is added to <style>
css = <<~CSS
.brag-filters {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.filter-btn {
  background: transparent;
  color: var(--color-dimmed);
  border: 1px solid var(--color-dimmed);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all var(--motion-fast);
  font-weight: 600;
  font-size: 0.9rem;
}
.filter-btn.active, .filter-btn:hover {
  background: var(--color-primary);
  color: var(--color-dark);
  border-color: var(--color-primary);
}
.project-card {
  transition: opacity 300ms ease, filter 300ms ease;
}
.filtered-out {
  opacity: 0.15;
  filter: grayscale(100%);
  pointer-events: none;
}
.year-separator {
  width: 100%;
  font-size: 2rem;
  color: var(--color-primary);
  font-weight: 900;
  margin: 3rem 0 1.5rem 0;
  padding-left: 1rem;
  border-left: 4px solid var(--color-primary);
  opacity: 0.8;
}
CSS

content.sub!("</style>", css + "</style>")

# Add filter buttons above <main> or inside
filters_html = <<~HTML
<!-- FILTRES D'IMPACT -->
<div class="brag-filters">
  <span style="color: var(--color-foreground)"><i class="fa-solid fa-filter"></i> Filtrer par niveau d'impact :</span>
  <button class="filter-btn active" data-filter="all">Tous</button>
  <button class="filter-btn" data-filter="principal">Principal</button>
  <button class="filter-btn" data-filter="staff">Staff</button>
</div>
HTML

content.sub!("<main>", "<main>\n\n" + filters_html)

# Add year separators and data attr to projects
projects_loop = <<~LIQUID
{% assign projects_sorted = site.data.brag.projects | sort: "sort_key" | reverse %}
{% assign current_year = '' %}
{% for project in projects_sorted %}
{% assign project_year = project.sort_key | divided_by: 10000 %}
{% if project_year != current_year %}
<h3 class="year-separator">{{ project_year }}</h3>
{% assign current_year = project_year %}
{% endif %}
<div class="project-card" data-impact-text="{{ project.impact.text | downcase | escape }}">
LIQUID

content.sub!(/\{% assign projects_sorted = .*?reverse %\}\\n\{% for project in projects_sorted %\}\\n<div class="project-card">/, projects_loop)

# Add year separators and data attr to opensource
opensource_loop = <<~LIQUID
{% assign opensource_sorted = site.data.brag.opensource | sort: "sort_key" | reverse %}
{% assign current_year = '' %}
{% for item in opensource_sorted %}
{% assign item_year = item.sort_key | divided_by: 10000 %}
{% if item_year != current_year %}
<h3 class="year-separator">{{ item_year }}</h3>
{% assign current_year = item_year %}
{% endif %}
<div class="project-card" data-impact-text="{{ item.impact.text | downcase | escape }}">
LIQUID

content.sub!(/\{% assign opensource_sorted = .*?reverse %\}\\n\{% for item in opensource_sorted %\}\\n<div class="project-card">/, opensource_loop)


# Append JavaScript at the end of the file
scripts = <<~JS

<script>
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const impactText = card.dataset.impactText || "";
        if (filter === "all") {
          card.classList.remove("filtered-out");
        } else if (impactText.includes(filter)) {
          card.classList.remove("filtered-out");
        } else {
          card.classList.add("filtered-out");
        }
      });
    });
  });
});
</script>
JS

content += scripts

File.write("brag.md", content)

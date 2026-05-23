content = File.read("brag.md")

old_css = content.match(/\.brag-filters \{.*?\.filtered-out \{.*?\}\n/m)[0]

new_css = <<~CSS
.filters-wrapper {
  position: sticky;
  top: 1rem;
  z-index: 100;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 0.8rem 1rem;
  margin-bottom: 2rem;
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
  opacity: 0.15;
  filter: grayscale(100%);
  pointer-events: none;
}
CSS

content.sub!(old_css, new_css)

old_html = content.match(/<!-- FILTRES D'IMPACT -->\n<div class="brag-filters impact-filters">.*?<\/div>\n\n<!-- FILTRES DE TAGS.*?<\/div>\n/m)[0]

new_html = <<~HTML
<!-- WRAPPER FILTRES STICKY -->
<div class="filters-wrapper">
  <!-- FILTRES D'IMPACT -->
  <div class="brag-filters impact-filters">
    <span><i class="fa-solid fa-filter"></i> Impact :</span>
    <button class="filter-btn active" data-filter="all"><i class="fa-solid fa-list-check"></i> Tous</button>
    <button class="filter-btn" data-filter="principal"><i class="fa-solid fa-crown"></i> Principal</button>
    <button class="filter-btn" data-filter="staff"><i class="fa-solid fa-map-location-dot"></i> Staff</button>
  </div>

  <!-- FILTRES DE TAGS (Generes en JS) -->
  <div class="brag-filters tag-filters" id="tag-filters-container">
    <!-- Buttons injected via JS -->
  </div>
</div>
HTML

content.sub!(old_html, new_html)

File.write("brag.md", content)

require 'json'

file_path = '_data/brag.json'
data = JSON.parse(File.read(file_path))
['projects', 'opensource'].each do |section|
  if data[section]
    data[section].each do |item|
      text = item['impact']['text'].downcase
      if text.include?('principal')
        item['impact']['type'] = 'principal'
      elsif text.include?('staff')
        item['impact']['type'] = 'staff'
      else
        item['impact']['type'] = 'other'
      end
    end
  end
end
File.write(file_path, JSON.pretty_generate(data))

markdown_file = 'brag.md'
content = File.read(markdown_file)

# Remove the old CSS correctly via string manipulation or multiline regex using m modifier
content.sub!(/\.brag-filters \{.*?\.year-separator \{.*?\n\}/m, <<~CSS.chomp)
.brag-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}
.brag-filters span {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-foreground);
  margin-right: 0.5rem;
  letter-spacing: 0.5px;
}
.filter-btn {
  background: var(--glass-bg);
  color: var(--color-foreground);
  border: 1px solid var(--glass-border);
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all var(--motion-fast);
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.filter-btn:hover {
  background: rgba(255,255,255,0.05);
  border-color: var(--glass-border-strong);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
.filter-btn.active {
  background: var(--color-primary);
  color: var(--color-dark);
  border-color: var(--color-primary);
  box-shadow: 0 0 20px rgba(36, 181, 255, 0.4);
}
.project-card {
  transition: opacity 300ms ease, filter 300ms ease, transform 300ms ease;
}
.filtered-out {
  display: none !important;
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
CSS

new_html = <<~HTML
<!-- FILTRES D'IMPACT -->
<div class="brag-filters">
  <span><i class="fa-solid fa-filter"></i> Vue d'impact :</span>
  <button class="filter-btn active" data-filter="all"><i class="fa-solid fa-list-check"></i> Tous</button>
  <button class="filter-btn" data-filter="principal"><i class="fa-solid fa-crown"></i> Principal</button>
  <button class="filter-btn" data-filter="staff"><i class="fa-solid fa-map-location-dot"></i> Staff</button>
</div>
HTML
content.sub!(/<!-- FILTRES D'IMPACT -->.*?<\/div>/m, new_html)

content = content.split("\n").map do |line|
  if line.include?('<div class="project-card" data-impact-text="{{ project.impact.text | downcase | escape }}">')
    '<div class="project-card" data-impact-type="{{ project.impact.type }}">'
  elsif line.include?('<div class="project-card" data-impact-text="{{ item.impact.text | downcase | escape }}">')
    '<div class="project-card" data-impact-type="{{ item.impact.type }}">'
  else
    line
  end
end.join("\n")

new_js = <<~JS
<script>
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  const separators = document.querySelectorAll(".year-separator");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const impactType = card.dataset.impactType || "";
        if (filter === "all") {
          card.classList.remove("filtered-out");
        } else if (impactType === filter) {
          card.classList.remove("filtered-out");
        } else if (impactType !== "") {
          card.classList.add("filtered-out");
        }
      });
      
      separators.forEach(sep => {
        let nextEl = sep.nextElementSibling;
        let hasVisibleCards = false;
        while(nextEl && !nextEl.classList.contains("year-separator")) {
          if (nextEl.classList.contains("project-card") && !nextEl.classList.contains("filtered-out")) {
            hasVisibleCards = true;
            break;
          }
          nextEl = nextEl.nextElementSibling;
        }
        sep.style.display = hasVisibleCards ? "block" : "none";
      });
    });
  });
});
</script>
JS
content.sub!(/<script>.*?<\/script>/m, new_js)

File.write(markdown_file, content)
puts "Success"

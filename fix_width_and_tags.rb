require 'json'

# --- 1. Regrouper les Tags Oranges ---
def map_tag(tag)
  case tag
  when 'Enterprise Standard', 'Platform Engineering', 'DevSecOps'
    'Architecture & Standards'
  when 'GitHub Copilot', '.NET Aspire', 'AI Strategy'
    'DevEx & IA'
  when 'CNCF', 'Global Leadership', 'Contribution'
    'Open Source & CNCF'
  when 'Meetup', 'BBL', 'Talk interne', 'Software Craftsmanship', 'Mentorship'
    'Communauté & Mentoring'
  else
    tag # Fallback
  end
end

['brag.json', 'talks.json'].each do |file_name|
  path = "_data/#{file_name}"
  next unless File.exist?(path)
  
  data = JSON.parse(File.read(path))
  
  if data.is_a?(Hash)
    ['projects', 'opensource'].each do |sec|
      if data[sec]
        data[sec].each do |item|
          (item['tags'] || []).each do |t|
            if t['class'] && t['class'].include?('tag--orange')
              t['label'] = map_tag(t['label'])
            end
          end
          # deduplicate labels inside item
          if item['tags']
             item['tags'].uniq! { |t| t['label'] + (t['class'] || "") }
          end
        end
      end
    end
  elsif data.is_a?(Array) # talks
    data.each do |item|
      if item['category']
        item['category'] = map_tag(item['category'])
      end
    end
  end
  
  File.write(path, JSON.pretty_generate(data))
end

# --- 2. Fixer la largeur du Filtre ---
md_path = "brag.md"
content = File.read(md_path)

new_filter_css = <<~CSS
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
CSS

content.sub!(/\.filters-wrapper \{.*?\n\}/m, new_filter_css.chomp)
File.write(md_path, content)
puts "Fix done!"

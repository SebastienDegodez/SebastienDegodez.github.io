require 'json'

file_path = '_data/brag.json'
data = JSON.parse(File.read(file_path))

# Remap impact.type intelligently
['projects', 'opensource'].each do |sec|
  if data[sec]
    data[sec].each do |item|
      text = item['impact']['text'].downcase
      
      if text.include?('distinguish')
        item['impact']['type'] = 'distinguished'
      elsif text.include?('principal')
        item['impact']['type'] = 'principal'
      elsif text.include?('staff')
        item['impact']['type'] = 'staff'
      elsif text.include?('techlead') || text.include?('tech lead') || text.include?('techleader')
        item['impact']['type'] = 'techleader'
      else
        item['impact']['type'] = 'other'
      end
    end
  end
end

File.write(file_path, JSON.pretty_generate(data))

# Update HTML in brag.md
md_path = "brag.md"
content = File.read(md_path)

old_html_regex = /<div class="brag-filters impact-filters">.*?<\/div>/m
new_html = <<~HTML
<div class="brag-filters impact-filters">
    <span><i class="fa-solid fa-filter"></i> Impact :</span>
    <button class="filter-btn active" data-filter="all"><i class="fa-solid fa-list-check"></i> Tous</button>
    <button class="filter-btn" data-filter="distinguished"><i class="fa-solid fa-medal"></i> Disting.</button>
    <button class="filter-btn" data-filter="principal"><i class="fa-solid fa-crown"></i> Principal</button>
    <button class="filter-btn" data-filter="staff"><i class="fa-solid fa-map-location-dot"></i> Staff</button>
    <button class="filter-btn" data-filter="techleader"><i class="fa-solid fa-bolt"></i> TechLead</button>
    <button class="filter-btn" data-filter="other"><i class="fa-solid fa-code-commit"></i> Impl.</button>
  </div>
HTML

content.sub!(old_html_regex, new_html.chomp)
File.write(md_path, content)
puts "Impact filters updated!"

require 'json'
all_tags = Hash.new(0)
begin
  brag = JSON.parse(File.read('_data/brag.json'))
  ['projects', 'opensource'].each do |sec|
    if brag[sec]
      brag[sec].each do |item|
        (item['tags'] || []).each do |t|
          if t['class'] && t['class'].include?('tag--orange')
            all_tags[t['label']] += 1
          end
        end
      end
    end
  end
rescue
end

begin
  talks = JSON.parse(File.read('_data/talks.json'))
  talks.each do |item|
    all_tags[item['category']] += 1 if item['category']
  end
rescue
end
puts "--- ORANGE TAGS ---"
all_tags.sort_by {|k,v| -v}.each { |k,v| puts "#{v}x #{k}" }

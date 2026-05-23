content = File.read("brag.md")
content.sub!('let tagHtml = `<span><i class="fa-solid fa-tags"></i> Sujets majeurs :</span>`;', 'let tagHtml = `<span><i class="fa-solid fa-tags"></i> Tags :</span>`;')
File.write("brag.md", content)

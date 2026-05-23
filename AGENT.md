# Instructions Agent (GitHub Copilot)

Ce fichier regroupe les connaissances contextuelles du repo pour aider les agents IA (Copilot, etc.) à comprendre l'environnement technique de ce portfolio/brag document.

## Stack Technique
- **Générateur de site statique :** Jekyll
- **Données :** JSON (`_data/brag.json`, `_data/talks.json`, etc.)
- **Templates :** Liquid
- **Style :** Custom CSS / Glassmorphism (via `design-tokens.css` et `default.html`)

## Démarrer l'environnement de développement en local

Pour prévisualiser le site et travailler dessus en local, **il ne faut pas faire un `jekyll serve` classique**. 
Le projet utilise Docker pour éviter de polluer l'environnement de l'hôte avec Ruby/Jekyll. De plus, l'image Docker officielle `jekyll/jekyll` utilise une version récente de Ruby qui n'inclut plus nativement la dépendance `webrick`.

**Commande officielle à utiliser pour démarrer le serveur (avec Livereload) :**

```bash
docker run --rm -v "$PWD:/srv/jekyll" -p 4000:4000 -p 35729:35729 --entrypoint bash jekyll/jekyll -c "gem install webrick && jekyll serve --livereload --host 0.0.0.0"
```

### Explications de la commande pour le debug
1. `--rm` : supprime le conteneur quand on l'arrête.
2. `-v "$PWD:/srv/jekyll"` : monte le dossier courant dans le serveur.
3. `-p 4000:4000` : ouvre le port principal du serveur web Jekyll.
4. `-p 35729:35729` : ouvre le port permettant le `--livereload` (rechargement automatique de la page lors d'une modification).
5. `--entrypoint bash ... -c "gem install webrick && ..."` : écrase le point d'entrée de l'image pour forcer l'installation de `webrick` avant de démarrer Jekyll.
6. `--host 0.0.0.0` : obligatoire à l'intérieur d'un conteneur Docker pour que le site soit accessible depuis la machine hôte via `localhost:4000`.

## Git & Cache
Les répertoires générés par la compilation locale (`_site/`, `.jekyll-cache/`, etc.) sont déjà ignorés dans le `.gitignore`. Ne jamais les commiter.
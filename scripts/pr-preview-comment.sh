#!/usr/bin/env bash
# Rédige le commentaire unique de l'aperçu de Pull Request (voir .github/workflows/pr-preview.yml).
#
#   pr-preview-comment.sh deployed <url_aperçu> <sha> [fichiers modifiés…]
#   pr-preview-comment.sh removed  <numéro_pr> <merged:true|false>
#
# Les présentations (_decks/NNN-slug.md ou .html publiées) modifiées par la PR reçoivent un lien direct.
set -euo pipefail

mode="${1:-}"
shift || true

case "$mode" in
  deployed)
    url="${1%/}/"
    sha="$2"
    shift 2
    decks=""
    for file in "$@"; do
      case "$file" in _decks/[0-9][0-9][0-9]-*.md|_decks/[0-9][0-9][0-9]-*.html) ;; *) continue ;; esac
      [ -f "$file" ] || continue
      grep -qE '^published:[[:space:]]*false' "$file" && continue
      slug=$(sed -n 's/^slug:[[:space:]]*//p' "$file" | head -n 1 | tr -d "\"' \r")
      [ -n "$slug" ] || continue
      title=$(sed -n 's/^title:[[:space:]]*//p' "$file" | head -n 1 | tr -d '\r' | sed -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'$/\1/")
      decks+="- [${title:-$slug}](${url}slides/${slug}/)"$'\n'
    done

    echo "### 🔎 Aperçu de cette Pull Request"
    echo
    echo "**${url}**"
    if [ -n "$decks" ]; then
      echo
      echo "Présentations modifiées :"
      printf '%s' "$decks"
    fi
    echo
    echo "<sub>Commit \`${sha:0:7}\` · en ligne d'ici une à deux minutes (déploiement GitHub Pages) · supprimé automatiquement au merge ou à la fermeture de la PR.</sub>"
    ;;
  removed)
    pr="$1"
    merged="${2:-false}"
    reason="fermée"
    [ "$merged" = "true" ] && reason="fusionnée"
    echo "### 🧹 Aperçu supprimé"
    echo
    echo "La PR a été ${reason} : \`pr-preview/pr-${pr}/\` a été retiré de la branche \`gh-pages\`."
    ;;
  *)
    echo "usage : $0 deployed <url> <sha> [fichiers…] | removed <pr> <merged>" >&2
    exit 2
    ;;
esac

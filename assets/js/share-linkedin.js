/**
 * Partage LinkedIn : copie le texte du post, puis ouvre LinkedIn avec l'URL de l'article.
 * Balisage : _includes/share-linkedin.html
 *
 * LinkedIn n'accepte que `url` dans son lien de partage (pas de texte pré-rempli) : on passe donc
 * par le presse-papiers. Les deux actions démarrent de façon synchrone dans le clic, sinon certains
 * navigateurs (Safari) bloquent soit la copie, soit la nouvelle fenêtre.
 */
(function () {
  'use strict';

  var SHARE_ENDPOINT = 'https://www.linkedin.com/sharing/share-offsite/';

  function buildShareUrl(articleUrl) {
    return SHARE_ENDPOINT + '?url=' + encodeURIComponent(articleUrl);
  }

  function init(root) {
    var button = root.querySelector('[data-share-button]');
    var status = root.querySelector('[data-share-status]');
    var textarea = root.querySelector('[data-share-text]');
    var articleUrl = root.getAttribute('data-share-url');
    if (!button || !textarea || !articleUrl) return;

    function say(message) {
      if (status) status.textContent = message;
    }

    function fallbackCopy() {
      // Sélectionne le texte : l'utilisateur n'a plus qu'à faire Ctrl/Cmd+C.
      var details = textarea.closest('details');
      if (details) details.open = true;
      textarea.focus();
      textarea.select();
      say('Copie automatique impossible : le texte est sélectionné, copiez-le (Ctrl/Cmd+C) puis collez-le dans LinkedIn.');
    }

    button.addEventListener('click', function () {
      var text = textarea.value.trim();
      var copy = null;

      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
          copy = navigator.clipboard.writeText(text);
        } catch (error) {
          copy = null;
        }
      }

      // Avec 'noopener', window.open renvoie toujours null (même quand la fenêtre s'ouvre) :
      // impossible de détecter un blocage de pop-up, d'où le conseil dans le message.
      window.open(buildShareUrl(articleUrl), '_blank', 'noopener');

      if (!copy) {
        fallbackCopy();
        return;
      }

      copy.then(function () {
        say('Texte copié. Collez-le (Ctrl/Cmd+V) dans la fenêtre LinkedIn. Rien ne s\'est ouvert ? Autorisez les pop-ups pour ce site, puis recliquez.');
      }, fallbackCopy);
    });
  }

  document.querySelectorAll('[data-share-linkedin]').forEach(init);
})();

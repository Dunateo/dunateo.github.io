/* Runs synchronously in <head>, before first paint: applies the saved light/dark choice
   and points the code-highlighting stylesheets at the right theme. External file so the
   Content-Security-Policy can forbid inline scripts. Stores nothing but "light"/"dark". */
(function () {
  var root = document.documentElement;
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') root.dataset.theme = t;
  } catch (e) { /* storage blocked: follow the system setting */ }

  /* Zola generates giallo-light.css / giallo-dark.css. Follow the forced theme if any,
     otherwise the system preference. Exposed for the toggle in site.js. */
  window.socleSyncCodeTheme = function () {
    var forced = root.dataset.theme;
    var light = document.getElementById('giallo-light');
    var dark = document.getElementById('giallo-dark');
    if (!light || !dark) return;
    light.media = forced === 'light' ? 'all' : forced === 'dark' ? 'not all' : '(prefers-color-scheme: light)';
    dark.media = forced === 'dark' ? 'all' : forced === 'light' ? 'not all' : '(prefers-color-scheme: dark)';
  };
  window.socleSyncCodeTheme();
})();

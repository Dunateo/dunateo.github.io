/* Site behaviour: theme toggle and scrollable tables. No dependency, no tracking. */
(function () {
  var root = document.documentElement;
  var KEY = 'theme';

  function store(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* private mode: keep for this page only */ }
  }

  function current() {
    if (root.dataset.theme === 'light' || root.dataset.theme === 'dark') return root.dataset.theme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /* Theme toggle: flips between light and dark, remembers the choice. */
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    var label = function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      toggle.title = 'Switch to ' + next + ' theme';
    };
    toggle.hidden = false;
    label();
    toggle.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      store(next);
      label();
      if (window.socleSyncCodeTheme) window.socleSyncCodeTheme();
    });
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', label);
    }
  }

  /* News summaries separate paragraphs with <br><br> inside one <p>:
     split them into real paragraphs so they get normal paragraph spacing. */
  Array.prototype.forEach.call(document.querySelectorAll('.prose p'), function (p) {
    var parts = p.innerHTML.split(/<br\s*\/?>\s*<br\s*\/?>/i);
    if (parts.length < 2) return;
    parts.forEach(function (html) {
      if (!html.trim()) return;
      var np = document.createElement('p');
      np.innerHTML = html;
      p.parentNode.insertBefore(np, p);
    });
    p.parentNode.removeChild(p);
  });

  /* Wide tables in articles scroll inside their own frame instead of the page. */
  var tables = document.querySelectorAll('.prose table');
  Array.prototype.forEach.call(tables, function (table) {
    if (table.parentElement.classList.contains('table-wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
    if (wrap.scrollWidth > wrap.clientWidth) {
      wrap.tabIndex = 0; /* keyboard users can scroll it */
      wrap.setAttribute('role', 'region');
      wrap.setAttribute('aria-label', 'Scrollable table');
    }
  });
})();

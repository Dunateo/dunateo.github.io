/* @ds-bundle: {"format":4,"namespace":"Socle","components":[{"name":"Button"},{"name":"Input"},{"name":"Badge"},{"name":"Alert"},{"name":"Card"},{"name":"Table"},{"name":"Chart"},{"name":"Spectrum"}]} */
(function () {
  /* Inclinaison des boutons vers la souris : le bouton penche de MAX degrés au plus,
     son ombre décalée s'allonge du côté opposé. Désactivé sur écran tactile
     et si l'utilisateur demande moins d'animations. */
  var MAX = 5, SHADOW = 2;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reset(b) {
    b.classList.remove('is-tilting');
    ['--sc-rx', '--sc-ry', '--sc-sx', '--sc-sy'].forEach(function (p) { b.style.removeProperty(p); });
  }

  function onMove(e) {
    var b = e.target.closest && e.target.closest('.sc-btn');
    if (!b || b.disabled || b.classList.contains('sc-btn--ghost')) return;
    var r = b.getBoundingClientRect();
    var tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    var ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    b.classList.add('is-tilting');
    b.style.setProperty('--sc-ry', (tx * MAX).toFixed(2) + 'deg');
    b.style.setProperty('--sc-rx', (-ty * MAX).toFixed(2) + 'deg');
    b.style.setProperty('--sc-sx', (-tx * SHADOW).toFixed(1) + 'px');
    b.style.setProperty('--sc-sy', (-ty * SHADOW).toFixed(1) + 'px');
  }

  function onOut(e) {
    var b = e.target.closest && e.target.closest('.sc-btn');
    if (b && !b.contains(e.relatedTarget)) reset(b);
  }

  function enableTilt(root) {
    if (!fine || calm) return false;
    root = root || document;
    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerout', onOut, { passive: true });
    return true;
  }

  /* Scroll progress: fills the ring with the reading position. At the bottom the ring
     closes, a few confetti pop (not under reduced motion) and the arrow becomes the Zn tile.
     Click: back to top. */
  var CONFETTI = ['--mantis-green', '--mantis-yellow', '--mantis-orange', '--mantis-pink', '--klein'];

  function burst(btn) {
    var box = btn.querySelector('.sc-scroll__burst');
    if (!box || calm) return;
    btn.classList.remove('is-bursting');
    void btn.offsetWidth; /* restart the ring flash */
    btn.classList.add('is-bursting');
    var n = 10;
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
      var d = 34 + Math.random() * 14;
      var c = document.createElement('i');
      c.style.setProperty('--c', 'var(' + CONFETTI[i % CONFETTI.length] + ')');
      c.style.setProperty('--dx', (Math.cos(a) * d).toFixed(1) + 'px');
      c.style.setProperty('--dy', (Math.sin(a) * d).toFixed(1) + 'px');
      c.style.setProperty('--r', Math.round(Math.random() * 360 - 180) + 'deg');
      if (i % 3 === 0) c.style.transform = 'rotate(45deg)';
      box.appendChild(c);
    }
    setTimeout(function () { box.textContent = ''; btn.classList.remove('is-bursting'); }, 800);
  }

  function enableScroll(btn) {
    if (!btn) return false;
    var bar = btn.querySelector('.sc-scroll__bar');
    var done = false, ticking = false;
    btn.hidden = false;

    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var y = window.scrollY || window.pageYOffset;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (bar) bar.style.strokeDashoffset = (100 - p * 100).toFixed(2);
      btn.classList.toggle('is-visible', max > window.innerHeight * 0.5 && y > window.innerHeight * 0.25);
      if (!done && p >= 0.995) {
        done = true;
        btn.classList.add('is-done');
        btn.setAttribute('aria-label', 'Back to top. You reached the end');
        burst(btn);
      } else if (done && p < 0.97) {
        done = false;
        btn.classList.remove('is-done');
        btn.setAttribute('aria-label', 'Back to top');
      }
    }
    function request() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });
      var main = document.querySelector('main');
      if (main && main.focus) main.focus({ preventScroll: true });
    });
    update();
    return true;
  }

  enableTilt(document);
  enableScroll(document.querySelector('.sc-scroll'));
  window.Socle = { version: '3', enableTilt: enableTilt, enableScroll: enableScroll };
})();

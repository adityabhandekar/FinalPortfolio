/* ============================================================
   ADITYA.DEV — TERMINAL BLUEPRINT
   ============================================================ */

const CONFIG = {
  roles: [
    "Full-Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Java Developer"
  ],
  typeSpeed: 65,
  deleteSpeed: 30,
  holdTime: 1400,
  email: "bhandekaraditya2@gmail.com"
};

/* ============ ROTATING ROLE ============ */
(function rotate() {
  const el = document.getElementById('rotatingRole');
  if (!el) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = CONFIG.roles[0];
    return;
  }
  let i = 0, c = 0, del = false;
  (function tick() {
    const w = CONFIG.roles[i];
    if (!del) {
      c++;
      el.textContent = w.slice(0, c);
      if (c === w.length) { del = true; return setTimeout(tick, CONFIG.holdTime); }
      return setTimeout(tick, CONFIG.typeSpeed);
    } else {
      c--;
      el.textContent = w.slice(0, c);
      if (c === 0) { del = false; i = (i + 1) % CONFIG.roles.length; }
      return setTimeout(tick, CONFIG.deleteSpeed);
    }
  })();
})();

/* ============ TERMINAL TYPING ============ */
(function termTyping() {
  const el = document.getElementById('termTyping');
  if (!el) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = "npm run dev";
    return;
  }
  const cmds = [
    "npm run dev",
    "mvn spring-boot:run",
    "flutter run -d chrome",
    "git push origin main"
  ];
  let ci = 0, ch = 0, del = false;
  (function tick() {
    const c = cmds[ci];
    if (!del) {
      ch++;
      el.textContent = c.slice(0, ch);
      if (ch === c.length) { del = true; return setTimeout(tick, 1300); }
      return setTimeout(tick, 55);
    } else {
      ch--;
      el.textContent = c.slice(0, ch);
      if (ch === 0) { del = false; ci = (ci + 1) % cmds.length; }
      return setTimeout(tick, 25);
    }
  })();
})();

/* ============ CLOCK ============ */
(function clock() {
  const el = document.getElementById('railClock');
  if (!el) return;
  function tick() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    el.textContent = hh + ':' + mm + ':' + ss;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ============ CURSOR CROSSHAIR ============ */
(function crosshair() {
  const el = document.getElementById('cursorX');
  if (!el) return;
  if (matchMedia('(hover: none)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let x = -100, y = -100, tx = -100, ty = -100;

  addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
    document.body.classList.add('has-mouse');
  });
  addEventListener('mouseleave', function () {
    document.body.classList.remove('has-mouse');
  });

  (function loop() {
    x += (tx - x) * 0.35;
    y += (ty - y) * 0.35;
    el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    requestAnimationFrame(loop);
  })();
})();

/* ============ ACTIVE RAIL LINK ============ */
(function activeRail() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.rail-link');
  if (!sections.length || !links.length) return;
  if (!('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(function (s) { obs.observe(s); });
})();

/* ============ MOBILE DRAWER ============ */
(function mobile() {
  const t = document.getElementById('mobileToggle');
  const d = document.getElementById('mobileDrawer');
  if (!t || !d) return;
  t.addEventListener('click', function () {
    const open = d.classList.toggle('open');
    t.setAttribute('aria-expanded', open);
  });
  d.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      d.classList.remove('open');
      t.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ============ SKILLS TABS ============ */
(function tabs() {
  const buttons = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.dataset.tab;
      buttons.forEach(function (b) {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on);
      });
      panels.forEach(function (p) {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });
})();

/* ============ PROJECT ACCORDION ============ */
(function projects() {
  const cards = document.querySelectorAll('[data-project]');
  if (!cards.length) return;

  cards.forEach(function (card) {
    const btn = card.querySelector('.proj-toggle');
    const detail = card.querySelector('.proj-detail');
    if (!btn || !detail) return;

    function toggle() {
      const open = card.classList.contains('open');

      cards.forEach(function (other) {
        if (other !== card && other.classList.contains('open')) {
          other.classList.remove('open');
          const ob = other.querySelector('.proj-toggle');
          const od = other.querySelector('.proj-detail');
          if (ob) {
            ob.setAttribute('aria-expanded', 'false');
            const l = ob.querySelector('.pt-label');
            if (l) l.textContent = '+ show details';
          }
          if (od) {
            od.style.maxHeight = od.scrollHeight + 'px';
            requestAnimationFrame(function () {
              od.style.maxHeight = '0px';
              od.style.opacity = '0';
            });
            setTimeout(function () {
              od.hidden = true;
              od.style.maxHeight = '';
              od.style.opacity = '';
            }, 450);
          }
        }
      });

      if (open) {
        card.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        const l = btn.querySelector('.pt-label');
        if (l) l.textContent = '+ show details';
        detail.style.maxHeight = detail.scrollHeight + 'px';
        requestAnimationFrame(function () {
          detail.style.maxHeight = '0px';
          detail.style.opacity = '0';
        });
        setTimeout(function () {
          detail.hidden = true;
          detail.style.maxHeight = '';
          detail.style.opacity = '';
        }, 450);
      } else {
        card.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        const l = btn.querySelector('.pt-label');
        if (l) l.textContent = '− hide details';
        detail.hidden = false;
        detail.style.maxHeight = '0px';
        detail.style.opacity = '0';
        requestAnimationFrame(function () {
          detail.style.maxHeight = detail.scrollHeight + 'px';
          detail.style.opacity = '1';
        });
        setTimeout(function () {
          detail.style.maxHeight = '';
        }, 500);
      }
    }

    btn.addEventListener('click', toggle);
  });
})();

/* ============ REVEAL (bulletproof) ============ */
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const safety = setTimeout(function () {
    els.forEach(function (e) { e.classList.add('in'); });
  }, 1400);

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
    clearTimeout(safety);
    return;
  }

  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

  els.forEach(function (el) {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add('in');
    else obs.observe(el);
  });

  setTimeout(function () { clearTimeout(safety); }, 1500);
})();

/* ============ CONTACT FORM ============ */
(function contact() {
  const f = document.getElementById('contactForm');
  const s = document.getElementById('formStatus');
  if (!f) return;

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    const n = f.name.value.trim();
    const em = f.email.value.trim();
    const su = f.subject.value.trim();
    const m = f.message.value.trim();

    if (!n || !em || !su || !m) {
      s.className = 'cf-status error';
      s.textContent = '→ please fill in all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      s.className = 'cf-status error';
      s.textContent = '→ please enter a valid email address.';
      return;
    }

    const sub = encodeURIComponent('Portfolio Contact: ' + su);
    const bod = encodeURIComponent('Name: ' + n + '\nEmail: ' + em + '\n\nMessage:\n' + m);
    s.className = 'cf-status info';
    s.textContent = '→ opening your email client…';
    window.location.href = 'mailto:' + CONFIG.email + '?subject=' + sub + '&body=' + bod;
    setTimeout(function () {
      s.className = 'cf-status';
      s.textContent = '';
      f.reset();
    }, 4000);
  });
})();

/* ============ COPYRIGHT YEAR ============ */
(function year() {
  const el = document.getElementById('copyright');
  if (el) el.textContent = '© ' + new Date().getFullYear() + ' Aditya Bhandekar';
})();
(() => {
  const navbar = document.getElementById('navbar');
  const menu = document.getElementById('mobile-menu');
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main > section[id]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileViewport = window.matchMedia('(max-width: 980px)');

  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) menu.querySelector('a')?.focus();
    else if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false, true);
    }
    if (event.key === 'Tab') {
      const focusable = [toggle, ...menu.querySelectorAll('a')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  mobileViewport.addEventListener('change', event => {
    if (!event.matches) setMenu(false);
  });

  let scheduled = false;
  function updateNavigation() {
    let current = sections[0]?.id;
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= 165) current = section.id;
    });
    navLinks.forEach(link => {
      const active = link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal, .reveal-right').forEach(element => {
      observer.observe(element);
    });
    document.body.classList.add('motion-ready');
    reducedMotion.addEventListener('change', event => {
      if (event.matches) document.body.classList.remove('motion-ready');
    });
  }
})();

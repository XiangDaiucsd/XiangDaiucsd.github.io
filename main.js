document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------
     Nav: glass background on scroll
     ------------------------------------------------ */
  const nav = document.getElementById('nav');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------
     Mobile hamburger menu
     ------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  const menuLinks = navMenu.querySelectorAll('a');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ------------------------------------------------
     Scroll-reveal (IntersectionObserver)
     ------------------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------
     Active nav-link highlight on scroll
     ------------------------------------------------ */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    let currentId = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) {
        currentId = sec.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

});

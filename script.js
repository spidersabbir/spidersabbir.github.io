/* ============================================================
   SCRIPT.JS — Portfolio JavaScript
   Handles: nav scroll state, mobile menu, fade-in observers,
            portfolio filter, page transitions
   ============================================================ */

(function () {
  'use strict';

  /* ── Nav: Scroll State ── */
  const nav = document.querySelector('.nav');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* ── Nav: Mobile Menu ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Fade-in: Intersection Observer ── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation — no need to re-trigger
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  /* ── Portfolio Filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
          const category = item.dataset.category;

          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            // Re-trigger fade-in for filtered items
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              });
            });
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Parallax Hero Image (subtle) ── */
  const heroImageWrap = document.querySelector('.hero-image-wrap');

  if (heroImageWrap) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const img = heroImageWrap.querySelector('img');
      if (img && scrolled < window.innerHeight) {
        img.style.transform = `translateY(${scrolled * 0.12}px)`;
      }
    }, { passive: true });
  }

  /* ── Hero initial stagger ── */
  // Hero content items animate in with a stagger on page load
  const heroItems = document.querySelectorAll('.hero-animate');
  heroItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s cubic-bezier(0, 0, 0.2, 1), transform 0.8s cubic-bezier(0, 0, 0.2, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 130);
  });

})();

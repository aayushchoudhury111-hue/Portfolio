(() => {
  const config = {
    resumePath: 'resume.pdf',
    formEndpoint: '',
    education: {
      college: '',
      university: '',
      academicYear: '',
      expectedGraduationYear: '',
    },
  };
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const boot = document.querySelector('.boot-sequence');
  const bootMessage = boot.querySelector('.boot-message');
  const bootLines = ['ESTABLISHING CONNECTION...', 'LOADING DIGITAL IDENTITY...', 'SIGNAL ACQUIRED.'];
  let bootTimer;
  let bootStep = 0;
  const finishBoot = () => {
    window.clearTimeout(bootTimer);
    boot.classList.add('complete');
    bootMessage.textContent = 'SIGNAL ACQUIRED.';
  };
  const advanceBoot = () => {
    bootMessage.textContent = bootLines[bootStep++];
    if (bootStep === bootLines.length) bootTimer = window.setTimeout(finishBoot, 480);
    else bootTimer = window.setTimeout(advanceBoot, 360);
  };
  if (reducedMotion) finishBoot();
  else bootTimer = window.setTimeout(advanceBoot, 360);
  boot.querySelector('.boot-skip').addEventListener('click', finishBoot);

  const revealTargets = document.querySelectorAll('.reveal, .milestone');
  const chapterSections = document.querySelectorAll('main > .chapter[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
  document.querySelectorAll('.chapter').forEach((chapter) => {
    chapter.querySelectorAll('.reveal').forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index * 55, 330)}ms`);
    });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('chapter')) {
            const activeId = entry.target.id;
            navLinks.forEach((link) => {
              const active = link.getAttribute('href') === `#${activeId}`;
              link.classList.toggle('active', active);
              if (active) link.setAttribute('aria-current', 'location');
              else link.removeAttribute('aria-current');
            });
          } else {
            entry.target.classList.add('in-view');
            currentObserver.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.01, rootMargin: '-42% 0px -48% 0px' });
    if (reducedMotion) revealTargets.forEach((target) => target.classList.add('in-view'));
    else revealTargets.forEach((target) => observer.observe(target));
    chapterSections.forEach((chapter) => observer.observe(chapter));
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      if (reducedMotion) timeline.classList.add('in-view');
      else observer.observe(timeline);
    }
  } else {
    revealTargets.forEach((target) => target.classList.add('in-view'));
    chapterSections.forEach((chapter) => chapter.classList.add('in-view'));
    document.querySelector('.timeline')?.classList.add('in-view');
  }

  document.querySelectorAll('.tool-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tool-tab').forEach((item) => item.classList.toggle('active', item === tab));
      document.querySelectorAll('.tool-panel').forEach((panel) => panel.classList.toggle('active', panel.id === `panel-${tab.dataset.panel}`));
    });
  });

  const tooltip = document.querySelector('.node-tip');
  document.querySelectorAll('.node[data-note]').forEach((node) => {
    const show = () => { tooltip.textContent = node.dataset.note; };
    const reset = () => { tooltip.textContent = 'HOVER OR FOCUS A NODE TO EXPLORE'; };
    node.addEventListener('mouseenter', show);
    node.addEventListener('focus', show);
    node.addEventListener('mouseleave', reset);
    node.addEventListener('blur', reset);
  });

  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-nav');
  mobileMenu.inert = true;
  mobileMenu.setAttribute('aria-hidden', 'true');
  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    mobileMenu.inert = true;
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu.classList.toggle('open', open);
    mobileMenu.inert = !open;
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
      menuButton.focus();
    }
  });

  Object.entries(config.education).forEach(([key, value]) => {
    const field = document.querySelector(`[data-education="${key}"]`);
    if (field && value.trim()) field.textContent = value;
  });
  const educationMeta = document.querySelector('#education-meta');
  if (educationMeta && Object.values(config.education).some((value) => value.trim())) educationMeta.hidden = false;

  const resumeLinks = document.querySelectorAll('.resume-nav, .hero-resume');
  fetch(config.resumePath, { method: 'HEAD' }).then((response) => {
    const isPdf = response.headers.get('content-type')?.includes('application/pdf');
    if (response.ok && isPdf) {
      resumeLinks.forEach((link) => {
        link.href = config.resumePath;
        link.hidden = false;
      });
    }
  }).catch(() => {});

  document.querySelector('#year').textContent = new Date().getFullYear();

  const progressBar = document.querySelector('.scroll-progress span');
  let progressFrame = 0;
  const updateProgress = () => {
    progressFrame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  };
  window.addEventListener('scroll', () => {
    if (!progressFrame) progressFrame = window.requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  document.addEventListener('visibilitychange', () => {
    document.documentElement.classList.toggle('page-hidden', document.hidden);
  });

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const cursor = document.querySelector('.custom-cursor');
  if (finePointer && !reducedMotion) {
    document.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      document.body.classList.add('custom-pointer-enabled');
      cursor.style.setProperty('--pointer-x', `${event.clientX}px`);
      cursor.style.setProperty('--pointer-y', `${event.clientY}px`);
    }, { passive: true });
    document.addEventListener('pointerleave', () => document.body.classList.remove('custom-pointer-enabled'));
    document.querySelectorAll('a, button, input, textarea, [tabindex]').forEach((item) => {
      item.addEventListener('pointerenter', () => document.body.classList.add('cursor-hover'));
      item.addEventListener('pointerleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  const emailAddress = 'aayushchoudhury111@gmail.com';
  document.querySelector('.copy-email').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const status = document.querySelector('.copy-status');
    const value = button.dataset.email;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement('textarea');
        field.value = value;
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      button.textContent = 'Copied';
      status.textContent = 'Email copied to clipboard.';
      window.setTimeout(() => { button.textContent = 'Copy email'; status.textContent = ''; }, 2200);
    } catch {
      status.textContent = `Copy unavailable. Email: ${value}`;
    }
  });

  document.querySelector('#contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(data.get('subject'));
    const body = encodeURIComponent(`Hi Aayush,\n\n${data.get('message')}\n\n— ${data.get('name')}\n${data.get('email')}`);
    if (config.formEndpoint) {
      const note = document.querySelector('#form-note');
      try {
        const response = await fetch(config.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Form service returned an error');
        note.textContent = 'Message submitted successfully.';
        event.currentTarget.reset();
      } catch {
        note.textContent = 'The form service could not submit this message. Please use the email link instead.';
      }
      return;
    }
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  });
})();

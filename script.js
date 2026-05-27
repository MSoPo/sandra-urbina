    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

    const sections = document.querySelectorAll('section[id]');
    const navAs    = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s.id; });
      navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : ''; });
    });

    function handleAppointment(e) {
      e.preventDefault();
      const btn = e.target.querySelector('.btn-submit');
      btn.textContent = '¡Solicitud enviada! ✓'; btn.style.background = '#2e8b57';
      setTimeout(() => { btn.textContent = 'Solicitar asesoría gratuita'; btn.style.background = ''; }, 3500);
    }
    async function handleContact(e) {
      e.preventDefault();
      const form = e.target;
      const btn = form.querySelector('.btn-contact');
      btn.textContent = 'Enviando...'; btn.disabled = true;
      try {
        const res = await fetch('https://formspree.io/f/xdajpbej', {
          method: 'POST', body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          btn.textContent = '¡Mensaje enviado! ✓'; btn.style.background = '#2e8b57'; form.reset();
          setTimeout(() => { btn.textContent = 'Enviar mensaje'; btn.style.background = ''; btn.disabled = false; }, 3500);
        } else {
          throw new Error();
        }
      } catch {
        btn.textContent = 'Error al enviar. Intenta de nuevo.'; btn.style.background = '#c0392b';
        setTimeout(() => { btn.textContent = 'Enviar mensaje'; btn.style.background = ''; btn.disabled = false; }, 3500);
      }
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.service-card').forEach(card => {
      card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .25s, border-color .25s';
      observer.observe(card);
    });

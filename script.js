// Landing page — borrador de trabajo
// NOTA: los formularios de abajo son solo de demostración (frontend).
// Para capturar emails de verdad hay que conectarlos a un servicio real
// (Mailchimp, Brevo, un Google Form, o un pequeño backend propio).

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.waitlist-form');
  const status = document.getElementById('form-status');

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;

      // Placeholder: aquí iría la llamada real a tu proveedor de email/backend.
      console.log('Nuevo registro en lista de espera:', email);

      if (status) {
        status.textContent = '¡Apuntado! Te avisamos en cuanto abramos el acceso.';
      } else {
        alert('¡Apuntado! Te avisamos en cuanto abramos el acceso.');
      }

      form.reset();
    });
  });

  // Enlace del libro pendiente de URL real (ver TODO en index.html).
  document.querySelectorAll('[data-pending-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.warn('Enlace del libro pendiente: falta la URL del punto de venta de Sento.');
    });
  });

  initScrollChoreography();
  initLaunchBanner();
});

// Banner sticky de lanzamiento con cuenta atrás (port a vanilla del
// componente "banner" de 21st.dev/originui, sin React).
function initLaunchBanner() {
  // TODO: poner aquí la fecha real de lanzamiento (esta es de ejemplo).
  const LAUNCH_DATE = new Date('2026-10-01T09:00:00+02:00');

  const banner = document.getElementById('launch-banner');
  const countdown = document.getElementById('banner-countdown');
  const closeBtn = document.getElementById('banner-close');
  if (!banner || !countdown) return;

  // Si el visitante lo cerró, no volver a mostrarlo durante la sesión.
  if (sessionStorage.getItem('launch-banner-closed')) return;

  closeBtn.addEventListener('click', () => {
    banner.hidden = true;
    sessionStorage.setItem('launch-banner-closed', '1');
  });

  const pad = (n) => String(n).padStart(2, '0');

  function render() {
    const diff = LAUNCH_DATE.getTime() - Date.now();
    if (diff <= 0) {
      banner.hidden = true;
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    countdown.innerHTML =
      (days > 0 ? '<span>' + days + '<small>d</small></span>' : '') +
      '<span>' + pad(hours) + '<small>h</small></span>' +
      '<span>' + pad(minutes) + '<small>m</small></span>' +
      '<span>' + pad(seconds) + '<small>s</small></span>';
  }

  render();
  banner.hidden = false;
  const timer = setInterval(render, 1000);
}

// Coreografía de scroll del hero (port a vanilla del componente React
// "scroll-choreography" de 21st.dev, sin framer-motion).
// Fase 1 (0–0.3): movimiento diagonal. Fase 2 (0.35–0.65): apilado al centro.
// Fase 3 (0.7–0.9): la imagen superior derecha se expande a pantalla completa.
function initScrollChoreography() {
  const section = document.getElementById('hero-choreo');
  if (!section) return;

  const els = {
    tl: section.querySelector('.choreo-tl'),
    tr: section.querySelector('.choreo-tr'),
    bl: section.querySelector('.choreo-bl'),
    br: section.querySelector('.choreo-br'),
    final: section.querySelector('.choreo-final'),
    heading: section.querySelector('.choreo-heading'),
  };

  // Interpolación lineal por tramos, equivalente a useTransform(progress, stops, values).
  function interp(p, stops, values) {
    if (p <= stops[0]) return values[0];
    for (let i = 0; i < stops.length - 1; i++) {
      if (p <= stops[i + 1]) {
        const t = (p - stops[i]) / (stops[i + 1] - stops[i]);
        return values[i] + (values[i + 1] - values[i]) * t;
      }
    }
    return values[values.length - 1];
  }

  const STOPS = [0, 0.3, 0.35, 0.65, 1];

  function offsets() {
    // En móvil las imágenes se separan menos para no pisar el texto central.
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    // El grupo de imágenes arranca desplazado hacia abajo para dejar
    // sitio al titular; la convergencia sigue siendo al centro.
    return mobile
      ? { x: 26, yTop: -14, yBottom: 30, w: 42, h: 15 }   // vw / vh
      : { x: 20, yTop: -8, yBottom: 18, w: 36, h: 24 };
  }

  function apply(p) {
    const vw = window.innerWidth / 100;
    const vh = window.innerHeight / 100;
    const o = offsets();
    const xL = -o.x * vw, xR = o.x * vw;
    const yT = o.yTop * vh, yB = o.yBottom * vh;

    const move = (el, xs, ys) => {
      const x = interp(p, STOPS, xs);
      const y = interp(p, STOPS, ys);
      el.style.transform = 'translate(calc(-50% + ' + x + 'px), calc(-50% + ' + y + 'px))';
    };

    move(els.tl, [xL, xL, xL, 0, 0], [yT, yB, yB, 0, 0]);
    move(els.br, [xR, xR, xR, 0, 0], [yB, yT, yT, 0, 0]);
    move(els.bl, [xL, xL, xL, 0, 0], [yB, yB, yB, 0, 0]);
    move(els.tr, [xR, xR, xR, 0, 0], [yT, yT, yT, 0, 0]);

    // Expansión final de la imagen superior derecha.
    els.tr.style.width = interp(p, [0.65, 0.7, 0.9, 1], [o.w, o.w, 100, 100]) * vw + 'px';
    els.tr.style.height = interp(p, [0.65, 0.7, 0.9, 1], [o.h, o.h, 100, 100]) * vh + 'px';
    els.tr.style.borderRadius = interp(p, [0.7, 0.9], [14, 0]) + 'px';

    // Las demás imágenes se desvanecen bajo la que se expande.
    const under = interp(p, [0.75, 0.85], [1, 0]);
    els.tl.style.opacity = under;
    els.bl.style.opacity = under;
    els.br.style.opacity = under;

    // El titular se desvanece al empezar el scroll.
    const headOp = interp(p, [0.12, 0.3], [1, 0]);
    els.heading.style.opacity = headOp;
    els.heading.style.pointerEvents = headOp < 0.4 ? 'none' : '';

    // Mensaje final sobre la imagen expandida.
    els.final.style.opacity = interp(p, [0.85, 0.97], [0, 1]);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    section.classList.add('no-motion');
    apply(0);
    return;
  }

  let current = 0;
  let target = 0;

  function readTarget() {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    target = Math.min(1, Math.max(0, -rect.top / total));
  }

  window.addEventListener('scroll', readTarget, { passive: true });
  window.addEventListener('resize', readTarget);
  readTarget();
  current = target;
  apply(current);

  // Suavizado tipo muelle: sustituye al useSpring de framer-motion.
  (function tick() {
    current += (target - current) * 0.14;
    if (Math.abs(target - current) > 0.0005) {
      apply(current);
    }
    requestAnimationFrame(tick);
  })();
}

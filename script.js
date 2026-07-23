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
});

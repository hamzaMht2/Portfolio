
/* ================================================
   1. MENU BURGER — MOBILE
================================================ */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(lien => {
  lien.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ================================================
   2. SCROLL REVEAL
================================================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const barres = entry.target.querySelectorAll('.skill-fill');
        barres.forEach(barre => {
          barre.style.width = barre.dataset.width + '%';
        });
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});


/* ================================================
   3. FORMULAIRE DE CONTACT — EMAILJS
================================================ */

// ✅ Public Key 
emailjs.init("d6S_iZd9Wg5AFin9A");

function handleSubmit(bouton) {

  // ✅ Les id correspondent à ceux dans ton HTML
  const name   = document.getElementById('from_name').value.trim();
  const email   = document.getElementById('from_email').value.trim();
  const message = document.getElementById('message').value.trim();


  // Change le bouton pendant l'envoi
  bouton.textContent = '⏳ Sending...';
  bouton.disabled = true;

  // ✅ Noms des variables identiques au template EmailJS
  const params = {
    from_name: name,
    from_email: email,
    message:  message
  };

  emailjs.send("service_rlwv0kl", "template_tb42bbm", params)
    .then(() => {
      // ✅ Succès
      bouton.textContent = '✅ Message sent!';
      bouton.style.background = '#2ecc71';

      // Vide les champs
      document.getElementById('from_name').value  = '';
      document.getElementById('from_email').value = '';
      document.getElementById('message').value    = '';

      setTimeout(() => {
        bouton.textContent = 'Send message ✉️';
        bouton.style.background = '';
        bouton.disabled = false;
      }, 3000);

    })
    .catch((error) => {
      // ❌ Erreur
      bouton.textContent = '❌ Something went wrong...';
      bouton.style.background = '#c0392b';
      bouton.disabled = false;
      console.log("FULL ERROR:", error);
alert(JSON.stringify(error));
    });
}
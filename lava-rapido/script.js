const whatsappNumber = '5511999999999'; // Troque pelo número real antes de divulgar.
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.service-link').forEach((link) => {
  const service = link.dataset.service;
  const text = `Olá! Tenho interesse em ${service}. Poderia me passar informações e disponibilidade?`;
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  link.target = '_blank';
  link.rel = 'noreferrer';
});

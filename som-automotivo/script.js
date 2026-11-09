const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
const demoDialog = document.querySelector('.demo-dialog');

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  });
});

document.querySelectorAll('[data-demo-contact]').forEach((button) => {
  button.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    demoDialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => demoDialog.close());
document.querySelector('.dialog-ok').addEventListener('click', () => demoDialog.close());

demoDialog.addEventListener('click', (event) => {
  if (event.target === demoDialog) demoDialog.close();
});

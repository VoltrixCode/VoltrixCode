// Interações apenas visuais para apresentar o conceito. Não há pagamento ou backend.
const checkoutDialog = document.querySelector('#checkout-dialog');
const ticketDialog = document.querySelector('#ticket-dialog');
const doorDialog = document.querySelector('#door-dialog');
const checkoutForm = document.querySelector('#checkout-form');
const ticketName = document.querySelector('#ticket-name');
const ticketCodeInput = document.querySelector('#ticket-code');
const validationResult = document.querySelector('#validation-result');

let demoTicketUsed = false;

document.querySelectorAll('.buy-button').forEach((button) => {
  button.addEventListener('click', () => checkoutDialog.showModal());
});

document.querySelector('#open-door').addEventListener('click', () => {
  validationResult.className = 'validation-result';
  validationResult.textContent = 'Código de exemplo: DEMO-4821';
  doorDialog.showModal();
});

document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => document.getElementById(button.dataset.close).close());
});

// Demonstra o formulário e uma tela de confirmação, sem iniciar cobrança.
checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(checkoutForm);
  const firstName = String(formData.get('name')).trim().split(/\s+/)[0];
  ticketName.textContent = firstName || 'amigo';
  checkoutDialog.close();
  ticketDialog.showModal();
});

// Código fixo e local para facilitar a apresentação presencial da demo.
document.querySelector('#validate-ticket').addEventListener('click', () => {
  const code = ticketCodeInput.value.trim().toUpperCase();
  validationResult.className = 'validation-result';

  if (code !== 'DEMO-4821') {
    validationResult.textContent = 'Código não encontrado. Confira e tente novamente.';
    return;
  }

  if (demoTicketUsed) {
    validationResult.classList.add('used');
    validationResult.textContent = 'Este ingresso de demonstração já foi utilizado.';
    return;
  }

  demoTicketUsed = true;
  validationResult.classList.add('ok');
  validationResult.textContent = 'Ingresso demonstrativo conferido. Entrada liberada na simulação.';
});

ticketCodeInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') document.querySelector('#validate-ticket').click();
});

// Fecha os modais quando o clique acontece fora do painel.
[checkoutDialog, ticketDialog, doorDialog].forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

// Interações apenas visuais para apresentar o conceito. Não há pagamento ou backend.
const checkoutDialog = document.querySelector('#checkout-dialog');
const ticketDialog = document.querySelector('#ticket-dialog');
const doorDialog = document.querySelector('#door-dialog');
const checkoutForm = document.querySelector('#checkout-form');
const ticketName = document.querySelector('#ticket-name');
const validationResult = document.querySelector('#validation-result');
const guestStatus = document.querySelector('#guest-status');
const markArrivedButton = document.querySelector('#mark-arrived');

let demoEntryUsed = false;

document.querySelectorAll('.buy-button').forEach((button) => {
  button.addEventListener('click', () => checkoutDialog.showModal());
});

document.querySelector('#open-door').addEventListener('click', () => {
  validationResult.className = 'validation-result';
  validationResult.textContent = demoEntryUsed
    ? 'A entrada demonstrativa já foi registrada.'
    : 'A equipe pode consultar a lista e dar baixa na chegada.';
  doorDialog.showModal();
});

document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => document.getElementById(button.dataset.close).close());
});

// Demonstra a mensagem que seguiria para o WhatsApp, sem enviá-la.
checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(checkoutForm);
  const fullName = String(formData.get('name')).trim();
  const firstName = fullName.split(/\s+/)[0];
  const quantity = Number(formData.get('quantity'));
  ticketName.textContent = firstName || 'amigo';
  document.querySelector('#ticket-quantity-label').textContent = `${quantity} ${quantity === 1 ? 'entrada' : 'entradas'}`;
  document.querySelector('#ticket-message').textContent = `Oi! Quero ${quantity} ${quantity === 1 ? 'entrada' : 'entradas'} para o After 001 do Subsolo Bar, dia 14/11.`;
  document.querySelector('#ticket-message-name').textContent = `Nome: ${fullName || 'amigo'}`;
  checkoutDialog.close();
  ticketDialog.showModal();
});

// Simula a baixa de uma entrada em uma lista local de exemplo.
markArrivedButton.addEventListener('click', () => {
  if (demoEntryUsed) return;
  demoEntryUsed = true;
  validationResult.classList.add('ok');
  validationResult.textContent = 'Entrada demonstrativa marcada como presente.';
  guestStatus.textContent = 'PRESENTE';
  guestStatus.classList.add('arrived');
  markArrivedButton.textContent = 'ENTRADA REGISTRADA';
  markArrivedButton.disabled = true;
});

// Fecha os modais quando o clique acontece fora do painel.
[checkoutDialog, ticketDialog, doorDialog].forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

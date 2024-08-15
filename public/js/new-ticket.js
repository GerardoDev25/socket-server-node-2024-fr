const currentTickerLabel = document.getElementById('lbl-new-ticket');
const createNewTicketButton = document.querySelector('button');

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/tickets/last')
    .then((res) => res.json())
    .then((res) => (currentTickerLabel.textContent = res))
    .catch((error) => console.error(error));
});

createNewTicketButton.addEventListener('click', createNewTicket);

function createNewTicket() {
  fetch('/api/tickets/', { method: 'POST' })
    .then((res) => res.json())
    .then((res) => (currentTickerLabel.textContent = res.number))
    .catch((error) => console.error(error));
}

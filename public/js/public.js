function renderTickets(tickets = []) {
  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i];
    if (i >= 4 || !ticket) break;
    document.querySelector(`#lbl-ticket-0${i + 1}`).textContent =
      'Ticket ' + ticket.number;
    document.querySelector(`#lbl-desk-0${i + 1}`).textContent =
      ticket.handleAtDesk;
  }
}

async function loadTickets() {
  const tickets = await fetch('api/tickets/working-on').then((res) =>
    res.json()
  );
  if (tickets.length === 0) return;

  renderTickets(tickets);
}

window.addEventListener('load', loadTickets);

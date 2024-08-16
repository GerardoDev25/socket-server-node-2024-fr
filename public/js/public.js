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

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data?.type === 'on-working-on-changed') {
      renderTickets(data.payload);
    }
  };

  socket.onclose = (event) => {
    console.log('Connection closed');
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log('Connected');
  };
}

connectToWebSockets();
window.addEventListener('load', loadTickets);

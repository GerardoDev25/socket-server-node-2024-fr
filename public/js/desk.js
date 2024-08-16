const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const btnAlert = document.querySelector('.alert');
const lblCurrentTicket = document.querySelector('small');

const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('desktop is required');
}
const deskNumber = searchParams.get('escritorio');
deskHeader.textContent = deskNumber;
let workingTicket = null;

function checkTicketCount(currentCount = 0) {
  if (currentCount === 0) {
    btnAlert.classList.remove('d-none');
  } else {
    btnAlert.classList.add('d-none');
  }

  // btnAlert.classList.toggle('d-none');
  lblPending.innerHTML = currentCount;
}

async function loadInitialCount() {
  const pendingTickets = await fetch('/api/tickets/pending').then((res) =>
    res.json()
  );
  checkTicketCount(pendingTickets.length);
  lblPending.textContent = pendingTickets.length || 0;
}

async function getTicket() {
  const { status, ticket, message } = await fetch(
    `/api/tickets/draw/${deskNumber}`
  ).then((res) => res.json());

  if (status == 'error') {
    lblCurrentTicket.textContent = message;
    return;
  }
  workingTicket = ticket;
  lblCurrentTicket.textContent = ticket.number;
}

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data?.type === 'on-ticket-count-changed') {
      // lblPending.textContent = data.payload;
      checkTicketCount(data.payload);
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

btnDraw.addEventListener('click', getTicket);

loadInitialCount();
connectToWebSockets();

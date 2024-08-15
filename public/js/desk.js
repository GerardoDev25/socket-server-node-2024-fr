const lblPending = document.querySelector('#lbl-pending');

async function loadInitialCount() {
  const pending = await fetch('/api/tickets/pending').then((res) => res.json());

  lblPending.textContent = pending.length || 0;
}

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'on-ticket-count-changed') {
      lblPending.textContent = data.payload;
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

loadInitialCount();
connectToWebSockets();

import { UuidAdapter } from '../../config';
import { Ticket } from '../../domain/interfaces';
import { WssService } from './wss.service';

export class TickerService {
  public tickets: Ticket[] = [
    { id: UuidAdapter.v4(), number: 1, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createAt: new Date(), done: false },
  ];

  private readonly workingOnTickets: Ticket[] = [];

  constructor(private readonly wssService = WssService.instance) {}

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.slice(0, 4);
  }

  public get pendingTicket(): Ticket[] {
    return this.tickets.filter((ticket) => !ticket.handleAtDesk);
  }

  public get lastTicketNumber() {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  // * web sockets listeners

  private onTicketNumberChange() {
    this.wssService.sendMessage(
      'on-ticket-count-changed',
      this.pendingTicket.length
    );
  }

  private onWorkingOnChange() {
    this.wssService.sendMessage(
      'on-working-on-changed',
      this.lastWorkingOnTickets
    );
  }

  public createTicket() {
    const ticket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber + 1,
      createAt: new Date(),
      done: false,
      handleAt: undefined,
      handleAtDesk: undefined,
    };

    this.tickets.push(ticket);
    this.onTicketNumberChange();
    return ticket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find((t) => !t.handleAtDesk);
    if (!ticket)
      return { status: 'error', message: 'there is not pending tickets' };

    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    this.workingOnTickets.unshift({ ...ticket });
    this.onTicketNumberChange();
    this.onWorkingOnChange()

    return { status: 'ok', ticket };
  }

  onFinishTicket(id: string) {
    const ticket = this.tickets.find((t) => t.id === id);
    if (!ticket) return { status: 'error', message: 'ticket not found' };

    this.tickets = this.tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, done: true } : ticket
    );

    return { status: 'ok' };
  }
}

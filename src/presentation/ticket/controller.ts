import { Request, Response } from 'express';
import { TickerService } from '../services';

export class TicketController {
  constructor(private readonly ticketService = new TickerService()) {}

  public getTickets = async (req: Request, resp: Response) => {
    return resp.json(this.ticketService.tickets);
  };

  public getLastTicketsNumber = async (req: Request, resp: Response) => {
    return resp.json(this.ticketService.lastTicketNumber);
  };

  public pendingTickets = async (req: Request, resp: Response) => {
    return resp.json(this.ticketService.pendingTicket);
  };

  public createTickets = async (req: Request, resp: Response) => {
    resp.status(201).json(this.ticketService.createTicket());
  };

  public drawTickets = async (req: Request, resp: Response) => {
    const { desk } = req.params;
    return resp.json(this.ticketService.drawTicket(desk));
  };

  public ticketsFinish = async (req: Request, resp: Response) => {
    const { ticketId } = req.params;

    return resp.json(this.ticketService.onFinishTicket(ticketId));
  };

  public workingOn = async (req: Request, resp: Response) => {
    return resp.json(this.ticketService.lastWorkingOnTickets);
  };
}

import { Request, Response } from 'express';
import { TickerService } from '../services';

export class TicketController {
  constructor(private readonly ticketService = new TickerService()) {}

  public getTickets = async (req: Request, res: Response) => {
    return res.json(this.ticketService.tickets);
  };

  public getLastTicketsNumber = async (req: Request, res: Response) => {
    return res.json(this.ticketService.lastTicketNumber);
  };

  public pendingTickets = async (req: Request, res: Response) => {
    return res.json(this.ticketService.pendingTicket);
  };

  public createTickets = async (req: Request, res: Response) => {
    res.status(201).json(this.ticketService.createTicket());
  };

  public drawTickets = async (req: Request, res: Response) => {
    const { desk } = req.params;
    return res.json(this.ticketService.drawTicket(desk));
  };

  public ticketsFinish = async (req: Request, res: Response) => {
    const { ticketId } = req.params;

    return res.json(this.ticketService.onFinishTicket(ticketId));
  };

  public workingOn = async (req: Request, res: Response) => {
    return res.json(this.ticketService.lastWorkingOnTickets);
  };
}

import { Request, Response } from 'express';

export class TicketController {
  constructor() {}

  public getTickets = async (req: Request, resp: Response) => {
    resp.json({
      msg: 'getTickets',
    });
  };

  public getLastTicketsNumber = async (req: Request, resp: Response) => {
    resp.json({
      msg: 'getLastTicketsNumber',
    });
  };

  public pendingTickets = async (req: Request, resp: Response) => {
    resp.json({
      msg: 'pendingTickets',
    });
  };

  public createTickets = async (req: Request, resp: Response) => {
    resp.json({
      msg: 'createTickets',
    });
  };

  public drawTickets = async (req: Request, resp: Response) => {
    resp.json({
      msg: 'drawTickets',
    });
  };

  public ticketsFinish = async (req: Request, resp: Response) => {
    resp.json({
      msg: 'ticketsFinish',
    });
  };

  public workingOn = async (req: Request, resp: Response) => {
    resp.json({
      msg: 'workingOn',
    });
  };
}

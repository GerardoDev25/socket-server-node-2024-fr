import { Router } from 'express';
import { TicketController } from './controller';

export class TicketRoutes {
  static get routes() {
    const routes = Router();

    const controller = new TicketController();

    routes.get('/',controller.getTickets);
    routes.get('/last',controller.getLastTicketsNumber);
    routes.get('/pending',controller.pendingTickets);

    routes.post('/',controller.createTickets);

    routes.get('/draw/:desk',controller.drawTickets);
    routes.put('/done/:ticketId',controller.ticketsFinish);

    routes.get('/working-on',controller.workingOn);

    return routes;
  }
}

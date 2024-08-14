import { Router } from 'express';
import { TicketRoutes } from './ticket';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );

    router.use('/api/tickets', TicketRoutes.routes);

    return router;
  }
}

import { Router } from 'express';
import { CreateProductHistoryController } from '../../data/controllers';

const routes = Router();

routes.post('/productsHistories', new CreateProductHistoryController().handle);

export default routes;

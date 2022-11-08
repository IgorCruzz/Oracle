import { Router } from 'express';
import { ListHello } from '../data/services/ListHello';

const routes = Router();

routes.get('/list', new ListHello().execute);

export default routes;

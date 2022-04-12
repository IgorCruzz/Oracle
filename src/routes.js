import { Router } from 'express';
import { ExampleController } from './data/controllers/Example.controller';

const routes = new Router();

routes.post('/example', new ExampleController().handle);

export default routes;

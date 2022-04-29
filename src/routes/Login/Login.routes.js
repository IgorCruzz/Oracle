import { Router } from 'express';
import { LoginController } from '../../data/controllers';
import { loginValidator } from '../../data/validators';

const routes = Router();

routes.post('/login', loginValidator, new LoginController().handle);

export default routes;

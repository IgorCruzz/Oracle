import { Router } from 'express';
import { PasswordRecoveryController } from '../../data/controllers';
import { recoveryPasswordValidator } from '../../data/validators';

const routes = Router();

routes.post(
  '/recoveryPassword',
  recoveryPasswordValidator,
  new PasswordRecoveryController().handle
);

export default routes;

import { Router } from 'express';
import {
  PasswordRecoveryController,
  PasswordUpdateController,
} from '../../data/controllers';
import { recoveryPasswordValidator } from '../../data/validators';

const routes = Router();

routes.post(
  '/getCode',
  recoveryPasswordValidator,
  new PasswordRecoveryController().handle
);

routes.post(
  '/recoveryPassword',
  // recoveryPasswordValidator,
  new PasswordUpdateController().handle
);

export default routes;

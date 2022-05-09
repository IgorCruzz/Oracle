import { Router } from 'express';
// import {
//   FindAgenciesController,
//   CreateAgencyController,
//   DeleteAgencyController,
//   UpdateAgencyController,
//   FindAgencyController,
// } from '../../data/controllers';
// import {
//   findAgenciesValidator,
//   createAgencyValidator,
//   deleteAgencyValidator,
//   updateAgencyValidator,
//   findAgencyValidator,
// } from '../../data/validators';
// import authenticator from '../../data/authenticator/jwt.authenticator';
import RecoverPassword from '../../data/jobs/RecoverPassword';

const routes = Router();

routes.post('/recoverPassword', async (req, res) => {
  RecoverPassword.handle({ create: 'teste' });
  // Queue.add(RecoverPassword.key, { code: 'CODE' });

  return res.status(200).json({ msg: 'ok' });
});

export default routes;

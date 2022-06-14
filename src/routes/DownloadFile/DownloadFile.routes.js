import { Router } from 'express';

import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const file = `${__dirname}/tmp/documents/${filename}`;
  return res.download(file);
});

export default routes;

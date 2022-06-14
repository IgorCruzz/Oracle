import { Router } from 'express';

import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post('/download', authenticator, (req, res) => {
  const { filename } = req.body;
  const file = `${__dirname}/tmp/documents/${filename}`;
  return res.download(file);
});

export default routes;

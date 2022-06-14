import { Router } from 'express';
import { resolve } from 'path';

import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.get('/download/:filename', authenticator, (req, res) => {
  const { filename } = req.params;
  const file = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'documents',
    filename
  );
  return res.download(file);
});

export default routes;

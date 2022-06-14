import { Router } from 'express';
import { resolve } from 'path';

const routes = Router();

routes.get('/download/:filename', (req, res) => {
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

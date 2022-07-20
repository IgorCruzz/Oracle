import { Router } from 'express';
import { resolve } from 'path';
import { Product_history } from '../../data/database/models';

const routes = Router();

routes.get('/product_history/download/:filename', async (req, res) => {
  const { filename } = req.params;
  const file = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'product_history',
    filename
  );

  const getFilename = await Product_history.findOne({
    where: { nm_file: filename },
  });

  const { nm_original_file } = getFilename;

  return res.download(file, nm_original_file);
});

export default routes;

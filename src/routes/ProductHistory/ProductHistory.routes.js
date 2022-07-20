import { Op } from 'sequelize';
import { Router } from 'express';
import { resolve } from 'path';
import { Product_history } from '../../data/database/models';

const routes = Router();

routes.get('/product_history/download/:filename', async (req, res) => {
  const { filename } = req.params;

  const getFilename = await Product_history.findOne({
    where: {
      [Op.and]: [{ nm_original_file: filename }],
    },
  });

  const { nm_file } = getFilename;

  const file = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'product_history',
    nm_file
  );

  return res.download(file, filename);
});

export default routes;

import { Op } from 'sequelize';
import { Router } from 'express';
import { resolve } from 'path';
import { Product_history } from '../../data/database/models';

const routes = Router();

routes.get('/product_history/download', async (req, res) => {
  const { nm_file } = req.query;

  const getFilename = await Product_history.findOne({
    where: {
      [Op.and]: [{ nm_file }],
    },
  });

  if (!getFilename) {
    return res.status(400).json({ error: 'Não há arquivo com este nome!' });
  }

  const file = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'tmp',
    'product_history',
    nm_file
  );

  return res.download(file, nm_file);
});

export default routes;

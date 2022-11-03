import { Router } from 'express';
import { s3 } from '../../config/s3';

const routes = Router();

routes.get('/product_history/download/:nm_file', async (req, res) => {
  const { nm_file } = req.params;

  s3.getObject(
    {
      Bucket: process.env.BUCKET,
      Key: `product_history/${nm_file}`,
    },
    (err, data) => {
      if (err) return console.log(err);

      res.end(data.Body);
    }
  );
});

export default routes;

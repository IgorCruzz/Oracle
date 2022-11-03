import { Router } from 'express';
import aws from 'aws-sdk';

const routes = Router();

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

aws.config.update({
  accessKeyId: 'DO0098U9A8D6HJZNNT6R',
  secretAccessKey: '83GJZKHnCH57T3obii3FW6qFcGTKS2a3FgumIM7GcZs',
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

routes.get('/product_history/download/:nm_file', async (req, res) => {
  const { nm_file } = req.params;

  s3.getObject(
    {
      Bucket: 'gerobras-development',
      Key: `product_history/${nm_file}`,
    },
    (err, data) => {
      if (err) return console.log(err);

      res.end(data.Body);
    }
  );
});

export default routes;

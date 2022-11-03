import { s3 } from '../../../config/s3';

export class DownloadMediaTimelapseService {
  async execute({ nm_file, res }) {
    s3.getObject(
      {
        Bucket: process.env.BUCKET,
        Key: `media_timelapses/${nm_file}`,
      },
      (err, data) => {
        if (err) return console.log(err);

        res.end(data.Body);
      }
    );
  }
}

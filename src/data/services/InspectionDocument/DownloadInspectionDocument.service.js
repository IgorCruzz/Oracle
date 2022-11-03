import { s3 } from '../../../config/s3';

export class DownloadInspectionDocumentService {
  async execute({ nm_file, res }) {
    s3.getObject(
      {
        Bucket: process.env.BUCKET,
        Key: `inspection_documents/${nm_file}`,
      },
      (err, data) => {
        if (err) return console.log(err);

        res.end(data.Body);
      }
    );
  }
}

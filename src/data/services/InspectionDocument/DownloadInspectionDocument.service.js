import aws from 'aws-sdk';

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

aws.config.update({
  accessKeyId: 'DO0098U9A8D6HJZNNT6R',
  secretAccessKey: '83GJZKHnCH57T3obii3FW6qFcGTKS2a3FgumIM7GcZs',
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

export class DownloadInspectionDocumentService {
  async execute({ nm_file, res }) {
    console.log({
      nm_file,
    });

    s3.getObject(
      {
        Bucket: 'gerobras-development',
        Key: `inspection_documents/${nm_file}`,
      },
      (err, data) => {
        if (err) return console.log(err);

        console.log(data);

        res.end(data.Body);
      }
    );
  }
}

import aws from 'aws-sdk';

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

aws.config.update({
  accessKeyId: 'DO0098U9A8D6HJZNNT6R',
  secretAccessKey: '83GJZKHnCH57T3obii3FW6qFcGTKS2a3FgumIM7GcZs',
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

export class DownloadMediaTimelapseService {
  async execute({ nm_file, res }) {
    s3.getObject(
      {
        Bucket: 'gerobras-development',
        Key: `media_timelapses/${nm_file}`,
      },
      (err, data) => {
        if (err) return console.log(err);

        res.end(data.Body);
      }
    );
  }
}

import aws from 'aws-sdk';

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

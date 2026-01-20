import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

let client = null;

const getClient = () => {
  if (!client) {    
    client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return client;
};

const createPresignedUrlWithClient = ({ bucket, key }) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(getClient(), command, { expiresIn: 3600 });
};

export default createPresignedUrlWithClient;

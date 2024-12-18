import * as dotenv from 'dotenv'; // Import dotenv
import { Storage } from '@google-cloud/storage';

dotenv.config({ path: '../../.env' });

export const gcpBucketName: string =
  process.env.GCP_BUCKET_NAME || 'photobox-storage';

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

async function checkBucketConnection(bucketName: string) {
  try {
    const [exists] = await storage.bucket(bucketName).exists();
    if (exists) {
      console.log(`Bucket ${bucketName} is accessible.`);
    } else {
      console.log(`Bucket ${bucketName} does not exist or is not accessible.`);
    }
  } catch (err) {
    console.error('Error connecting to bucket:', err.message);
  }
}

// console.log(gcpBucketName);
// checkBucketConnection(gcpBucketName);
//
// console.log('Credentials Path:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
//
// console.log('Bucket name:', gcpBucketName);

console.log('Dirname: ', __dirname, '../credentials');

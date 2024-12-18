import * as path from 'node:path';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: path.resolve(
    __dirname,
    '../../credentials/photobox-444416-aa2fad3ad6c9.json',
  ),
});

async function testBucket() {
  try {
    const bucketName = 'photobox-storage';
    const [exists] = await storage.bucket(bucketName).exists();
    console.log(`Bucket ${bucketName} exists:`, exists);
  } catch (error) {
    console.error('Failed to connect to bucket:', error.message);
  }
}

testBucket();

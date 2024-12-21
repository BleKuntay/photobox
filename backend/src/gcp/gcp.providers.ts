import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

@Injectable()
export class GCPProviders {
  private storage: Storage;
  private readonly bucketName: string;

  constructor() {
    this.storage = new Storage({
      keyFilename: path.resolve(
        __dirname,
        '../../credentials/photobox-444416-aa71ee041d2d.json',
      ),
    });
    this.bucketName = 'photobox-storage';
  }

  async uploadPhoto(
    file: Express.Multer.File,
    destination: string,
  ): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const blob = bucket.file(destination);

      const stream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.end(file.buffer);

      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });

      console.log(
        `Upload photo: ${destination} uploaded to ${this.bucketName}`,
      );
      return `https://storage.googleapis.com/${this.bucketName}/${destination}`;
    } catch (e) {
      console.error('Error uploading file:', e.message);
      throw new Error('Failed to upload file');
    }
  }

  async renamePhoto(oldName: string, newName: string): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      await bucket.file(oldName).rename(newName);
      console.log(`Photo ${oldName} renamed to ${newName}`);
      return newName;
    } catch (e) {
      console.error('Error renaming file:', e.message);
      throw new Error('Failed to rename file');
    }
  }

  async deletePhoto(photoName: string): Promise<string> {
    try {
      await this.storage.bucket(this.bucketName).file(photoName).delete();
      console.log(`Photo '${photoName}' deleted`);
      return photoName;
    } catch (e) {
      if (e.code === 404) {
        console.warn(
          `File '${photoName}' not found in bucket, skipping deletion.`,
        );
        return photoName;
      }
      console.error('Error deleting file:', e.message);
      throw new Error('Failed to delete photo');
    }
  }

  async downloadPhoto(photoName: string): Promise<NodeJS.ReadableStream> {
    try {
      const fullFilePath = `photos/${photoName}`;
      const file = this.storage.bucket(this.bucketName).file(fullFilePath);

      console.log(`Attempting to download file: ${photoName}`);

      const exists = await file.exists();
      if (!exists[0]) {
        console.error(`File '${photoName}' not found in bucket`);
        throw new Error(`File '${photoName}' not found in bucket`);
      }

      console.log(`Downloading photo: ${photoName}`);
      return file.createReadStream();
    } catch (e) {
      console.error('Error downloading file:', e.message);
      throw new Error('Failed to download photo');
    }
  }
}

// utils/aws-s3.js
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export const uploadToS3 = async (fileBuffer, fileName, mimeType) => {
    const bucketName = process.env.AWS_BUCKET_NAME;  // Pastikan bucket name sudah disetel

    if (!bucketName) {
        throw new Error("Bucket name is missing from environment variables");
    }

    const params = {
        Bucket: bucketName,  // Pastikan bucket name disetel dengan benar
        Key: fileName,       // Nama file di S3
        Body: fileBuffer,    // File yang akan di-upload
        ContentType: mimeType,
        // ACL: 'public-read',  // Atur agar file bisa diakses publik
    };

    try {
        return await s3.upload(params).promise();
    } catch (error) {
        throw new Error("Failed to upload file to S3");
    }
};

export const deleteFromS3 = async (fileName) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
    };

    try {
        await s3.deleteObject(params).promise();
    } catch (error) {
        throw new Error("Failed to delete from S3");
    }
};

export const copyFileInS3 = async (oldFileName, newFileName) => {
    const bucketName = process.env.AWS_BUCKET_NAME;

    const copyParams = {
        Bucket: bucketName,
        CopySource: `${bucketName}/${oldFileName}`,
        Key: newFileName,
    }

    try {
        await s3.copyObject(copyParams).promise();
        console.log(`File copied to ${newFileName}`);
    } catch (error) {
        console.log("Failed to copy from S3");
        throw new Error("Failed to copy from S3");
    }
};
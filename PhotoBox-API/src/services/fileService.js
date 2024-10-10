import prisma from "../utils/PrismaClient.js";
import {copyFileInS3, deleteFromS3} from "../utils/s3.js";

export const getAllFilesService = async () => {
    return prisma.file.findMany();
}

export const getFileByIdService = async (id) => {
    const file = await prisma.file.findUnique({
        where: {
            id: id
        }
    });

    if (!file) {
        throw new Error(`File with id ${id} not found`);
    }

    return file;
}

export const createFileService = async (data) => {
    try {
        console.log("Saving file metadata to database...");
        const file = await prisma.file.create({
            data: {
                fileName: data.fileName,
                type: data.type,
                size: data.size,
                url: data.url,
            },
        });
        console.log("File metadata saved successfully:", file);
        return file;
    } catch (error) {
        console.error("Error during saving file metadata:", error.message);
        throw new Error("Failed to save file metadata");
    }
};

export const updateFileService = async (id, newFileName) => {
    try {
        // Find file
        const file = await prisma.file.findUnique({
            where: { id: parseInt(id) }
        });

        // Check if not exist
        if (!file) {
            throw new Error(`File with id ${id} not found`);
        }

        // copy old file to a new file, then delete old file
        await copyFileInS3(file.fileName, newFileName);
        await deleteFromS3(file.fileName);

        // update metadata in DB
        const updatedFile = await prisma.file.update({
            where: {
                id: parseInt(id)
            },
            data: {
                fileName: newFileName,
                url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFileName}`
            }
        });

        console.log("Saving file metadata saved successfully:", newFileName);
        return updatedFile;
    } catch (error) {
        console.error("Error during file update:", error.message);
        throw new Error("Error during file update");
    }
};

export const deleteFileService = async (id) => {
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!file) {
            throw new Error(`File with id ${id} not found`);
        }

        await deleteFromS3(file.fileName);

        await prisma.file.delete({
            where: {
                id: parseInt(id)
            }
        });

        return file;
    } catch (error) {
        throw new Error("Error deleting file metadata");
    }
};
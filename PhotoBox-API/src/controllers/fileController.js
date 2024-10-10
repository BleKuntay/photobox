import { getAllFilesService, getFileByIdService, createFileService, updateFileService, deleteFileService } from "../services/fileService.js";
import { uploadToS3 } from "../utils/s3.js";

export const getAllFilesController = async (req, res) => {
    try {
        const files = await getAllFilesService();
        return res.status(200).json({
            length: files.length,
            files: files,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching files: ' + error.message,
        });
    }
};

export const getFileByIdController = async (req, res) => {
    const id = req.params.id;

    try {
        const file = await getFileByIdService(parseInt(id));

        if (!file) {
            return res.status(404).json({
                message: `File with id ${id} not found`
            });
        }

        return res.status(200).json({
            data: file,
            message: `File with id ${id} found`,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching files: ' + error.message,
        });
    }
};

export const uploadFileController = async (req, res) => {
    const file = req.file;

    if (!file) {
        console.log("No file uploaded");
        return res.status(400).json({
            message: 'No file uploaded',
        });
    }

    try {
        console.log("Step 1: File received:", file.originalname);

        const s3Response = await uploadToS3(file.buffer, file.originalname, file.mimetype);
        console.log("Step 2: File uploaded to S3:", s3Response.Location);

        const fileData = {
            fileName: file.originalname,
            type: file.mimetype,
            size: file.size,
            url: s3Response.Location,
        };

        const savedFile = await createFileService(fileData);
        console.log("Step 3: File metadata saved to database:", savedFile);

        return res.status(200).json({
            data: savedFile,
            message: 'File saved successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const updateFileController = async (req, res) => {
    const id = parseInt(req.params.id);
    const { newFileName } = req.body;

    if (!newFileName) {
        return res.status(400).json({
            message: 'New file name is required',
        });
    }

    try {
        const updatedFile = await updateFileService(id, newFileName);

        return res.status(200).json({
            data: updatedFile,
            message: 'File saved successfully with name: ' + newFileName,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const deleteFileController = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedFile = await deleteFileService(id);

        return res.status(200).json({
            message: 'File deleted successfully',
            data: deletedFile,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
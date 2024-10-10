import {
    createFolderService,
    deleteFolderService,
    getAllFoldersService,
    getFolderByIdService
} from "../services/folderService.js";

export const getAllFolders = async (req, res) => {
    try {
        const folders = await getAllFoldersService();
        return res.json({
            length: folders.length,
            data: folders,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching folders: ' + error.message,
        });
    }
};

export const getFolderById = async (req, res) => {
    const id = req.params.id;

    try {
        const folder = await getFolderByIdService(id);

        return res.status(200).json({
            folder: folder,
            message: `File with id ${id} found`,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching folder: ' + error.message,
        })
    }
};

export const createFolder = async (req, res) => {
    const userId = req.user.id;
    const { folderName } = req.body;

    try {
        const newFolder = await createFolderService({ folderName }, userId);

        return res.status(201).json({
            message: `Folder with name ${folderName} created`,
            data: newFolder,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error creating folder: ' + error.message,
        });
    }
};

export const deleteFolder = async (req, res) => {
    const folderId = req.params.id;

    try {
        const deletedFolder = await deleteFolderService(parseInt(folderId));

        return res.status(201).json({
            message: `Folder with id ${folderId} deleted`,
            data: deletedFolder
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error deleting folder: ' + error.message,
        });
    }
};
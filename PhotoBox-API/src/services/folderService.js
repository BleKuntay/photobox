import prisma from "../utils/PrismaClient.js";

export const getAllFoldersService = async () => {
    return prisma.folder.findMany();
};

export const getFolderByIdService = async (id) => {
    return prisma.folder.findUnique({
        where: {
            id: parseInt(id)
        }
    });
};

export const createFolderService = async (data, userId) => {
    if (!data.folderName) {
        throw new Error('Folder name is required');
    }

    try {
        return await prisma.folder.create({
            data: {
                folderName: data.folderName,
                user: {
                    connect: {id: userId}
                }
            }
        });
    } catch (error) {
        throw new Error("Error creating folder: " + error.message);
    }
};

export const deleteFolderService = async (id) => {
    const folder = await prisma.folder.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    if (!folder) {
        throw new Error(`Folder with id ${id} not found`);
    }

    try {
        return await prisma.folder.delete({
            where: {
                id: parseInt(id)
            }
        });
    } catch (error) {
        throw new Error("Error deleting file metadata");
    }
};
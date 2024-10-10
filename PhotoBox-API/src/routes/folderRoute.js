import { Router } from "express";
import { createFolder, getAllFolders, getFolderById } from "../controllers/folderController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', authenticateToken, getAllFolders);
router.get('/:id', authenticateToken, getFolderById);
router.post('/create-folder', authenticateToken, createFolder);

export default router;
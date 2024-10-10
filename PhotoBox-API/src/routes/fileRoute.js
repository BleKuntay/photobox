import { Router } from "express";
import {
    deleteFileController,
    getAllFilesController,
    getFileByIdController,
    updateFileController,
    uploadFileController
} from "../controllers/fileController.js";
import {  upload } from "../utils/multer.js";

const router = Router();

router.get('/', getAllFilesController);
router.get('/:id', getFileByIdController);
router.put('/:id', updateFileController);
router.delete('/:id', deleteFileController);
router.post('/upload', upload.single('file'), uploadFileController);

export default router;
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import FileRoutes from "./routes/fileRoute.js";
import FolderRoute from "./routes/folderRoute.js";
import AuthRoute from "./routes/authRoute.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', AuthRoute);
app.use('/api/files', FileRoutes);
app.use('/api/folders', FolderRoute);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

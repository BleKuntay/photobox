import axios from 'axios';

export const showFileById = async (fileId) => {
    try {
        await axios.get(`http://localhost:3000/api/files/${fileId}`);
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
}
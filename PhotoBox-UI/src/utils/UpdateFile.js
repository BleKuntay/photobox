import axios from 'axios';

export const updateFile = async (fileId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:3000/api/files/${fileId}`);
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

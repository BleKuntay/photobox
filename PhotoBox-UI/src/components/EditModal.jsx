import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const EditModal = ({ fileId, currentFileName, onClose, onSave }) => {
    const [newFileName, setNewFileName] = useState(currentFileName);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await axios.put(`http://localhost:3000/api/files/${fileId}`, {
                newFileName: newFileName,
            });
            onSave(fileId, newFileName);
            onClose();
        } catch (err) {
            setError('Error updating file name.');
            console.error('Error updating file:', err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-primary p-6 rounded-lg shadow-lg w-96">
                <h3 className="font-bold text-lg ">Edit File Name</h3>
                <p className="py-4"><span className='tracking-wide font-semibold'>Current file name:</span> {currentFileName}</p>
                <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="input input-bordered w-full mb-4"
                />
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-end space-x-2">
                    <button type="button" className="btn" onClick={onClose}>
                        Close
                    </button>
                    <button type="button" className="btn bg-button hover:bg-yellow-500 text-black" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;

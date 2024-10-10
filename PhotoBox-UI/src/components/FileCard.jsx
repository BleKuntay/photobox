import { useEffect, useState } from "react";
import axios from "axios";
import MenuBtn from "../assets/menu-btn.svg";
import InfoBtn from "../assets/info.svg";
import EditBtn from "../assets/edit.svg";
import DeleteBtn from "../assets/delete.svg";
import InfoModal from "./InfoModal.jsx";
import EditModal from "./EditModal"; // Import EditModal
import { deleteFileById } from "../utils/DeleteFileById.js";  // Import fungsi dari utils

const FileCard = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null); // Digunakan untuk menyimpan file yang dipilih
    const [isModalOpen, setIsModalOpen] = useState(false); // Untuk modal info
    const [modalLoading, setModalLoading] = useState(false); // Loading saat modal info dibuka
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // Untuk modal edit
    const [fileToEdit, setFileToEdit] = useState(null);  // File yang akan diedit

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/files')
            .then(res => {
                if (Array.isArray(res.data.files)) {
                    setFiles(res.data.files);
                } else {
                    setError(new Error('Data yang diterima tidak berisi array files'));
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const openModal = async (fileId) => {
        setModalLoading(true); // Mulai loading untuk modal info
        try {
            const response = await axios.get(`http://localhost:3000/api/files/${fileId}`);
            console.log('Detail file:', response.data);
            setSelectedFile(response.data); // Simpan detail file di state
            setIsModalOpen(true); // Buka modal setelah data berhasil diambil
        } catch (err) {
            console.error('Error fetching file details:', err);
        } finally {
            setModalLoading(false); // Akhiri loading setelah fetch selesai
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null); // Reset state setelah modal ditutup
    };

    const handleDelete = async (fileId) => {
        try {
            const success = await deleteFileById(fileId);
            if (success) {
                setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
            }
        } catch (error) {
            console.error('Error occurred while deleting file:', error);
        }
    };

    // Fungsi untuk membuka EditModal
    const openEditModal = (file) => {
        setFileToEdit(file);  // Simpan file yang akan diedit
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setFileToEdit(null);
    };

    const handleSaveFileName = (fileId, newFileName) => {
        setFiles((prevFiles) =>
            prevFiles.map((file) =>
                file.id === fileId ? { ...file, fileName: newFileName } : file
            )
        );
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            {files.length > 0 ? (
                <div className="grid grid-cols-4 gap-5 px-10">
                    {files.map(file => (
                        <div key={file.id} className='w-full p-2 bg-secondary shadow-lg rounded'>
                            <img src={file.url} alt={file.fileName} className='aspect-4/3 object-cover rounded'/>
                            <div className='flex flex-row items-center justify-between mt-2'>
                                <div className='flex flex-col text-white ps-2'>
                                    <p>{file.fileName}</p>
                                </div>
                                <div className="dropdown dropdown-top dropdown-end">
                                    <div tabIndex={0} role="button"
                                         className="hover:bg-gray-600 duration-300 p-1 rounded-full m-1">
                                        <img src={MenuBtn} alt=""/>
                                    </div>
                                    <ul tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                                        {/* Info Button */}
                                        <li>
                                            <button className='flex flex-row'
                                                    onClick={()=>openModal(file.id)}>
                                                <img src={InfoBtn} alt=""/>
                                                <span>Info</span>
                                            </button>
                                        </li>

                                        {/* Edit Button */}
                                        <li>
                                            <button className='flex flex-row' onClick={() => openEditModal(file)}>
                                                <img src={EditBtn} alt=""/>
                                                <span>Edit Name</span>
                                            </button>
                                        </li>

                                        {/* Delete Button */}
                                        <li>
                                            <button className='flex flex-row text-red-500' onClick={() => handleDelete(file.id)}>
                                                <img src={DeleteBtn} alt=""/>
                                                <span>Delete</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No files available</p>
            )}

            {/* Modal Info */}
            {isModalOpen && selectedFile && (
                <InfoModal
                    photo={selectedFile.url}
                    fileName={selectedFile.fileName}
                    size={selectedFile.size}
                    type={selectedFile.type}
                    createdAt={selectedFile.createdAt}
                    loading={modalLoading}
                    onClose={closeModal}
                />
            )}

            {/* Modal Edit */}
            {isEditModalOpen && fileToEdit && (
                <EditModal
                    fileId={fileToEdit.id}
                    currentFileName={fileToEdit.fileName}
                    onClose={closeEditModal}
                    onSave={handleSaveFileName}
                />
            )}
        </>
    );
};

export default FileCard;

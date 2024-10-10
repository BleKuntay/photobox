import { useEffect, useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const InfoModal = ({ fileId, onClose }) => {
    const [fileData, setFileData] = useState(null); // State untuk menyimpan data file
    const [loading, setLoading] = useState(true); // State untuk loading
    const [error, setError] = useState(null); // State untuk menangani error

    // Fetch detail file dari API saat fileId berubah
    useEffect(() => {
        if (fileId) {
            setLoading(true); // Set loading true ketika fetch data
            axios
                .get(`http://localhost:3000/api/files/${fileId}`)
                .then(res => {
                    console.log(`File data [${fileId}]`, res.data);
                    setFileData(res.data); // Simpan data file dari API
                })
                .catch(err => {
                    console.log(err);
                    setError('Failed to load file data');
                })
                .finally(() => {
                    setLoading(false); // Set loading false setelah fetch selesai
                });
        }
    }, [fileId]);

    if (loading) {
        return <div className="loading loading-spinner loading-lg"></div>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="font-bold text-lg">File Info</h3>

                {fileData && (
                    <>
                        {/* Menampilkan foto berdasarkan URL */}
                        <img
                            src={fileData.url}
                            alt={fileData.fileName}
                            className="w-full h-auto object-cover rounded mb-4"
                        />

                        {/* Menampilkan informasi file lainnya */}
                        <p>
                            <strong>File Name:</strong> {fileData.fileName}
                        </p>
                        <p>
                            <strong>Size:</strong> {fileData.size} bytes
                        </p>
                        <p>
                            <strong>Type:</strong> {fileData.type}
                        </p>
                        <p>
                            <strong>Created At:</strong> {new Date(fileData.createdAt).toLocaleString()}
                        </p>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button type="button" className="btn" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoModal;

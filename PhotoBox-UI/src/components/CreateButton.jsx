import {useState} from "react";
import axios from "axios";
import Success from '../assets/success.svg';

const CreateButton = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:3000/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus('File uploaded successfully!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            setUploadStatus('File upload failed!');
        }
    };

    return (
        <>
        <button className="p-2 bg-button rounded-full aspect-square shadow fixed bottom-4 right-4"
                onClick={() => document.getElementById('my_modal_1').showModal()}
        >
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="30"
                 height="30"
                 viewBox="0 0 24 24"
                 fill="bg-transparent">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
        </button>
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <div className="px-5">
                    <form method="dialog">
                        <h2 className="text-lg font-bold mb-4">Upload Photo</h2>

                        {/* Input file */}
                        <input type="file" onChange={handleFileChange} className="mb-4"/>

                        {/* Status upload */}
                        {uploadStatus && <p>{uploadStatus}</p>}
                        <div className="flex flex-row justify-end gap-5">
                            <button className="btn">Close</button>
                            <button
                                className="px-4 py-2 bg-button hover:bg-yellow-500 text-black font-[500] duration-300 rounded"
                                onClick={handleUpload}
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>

        {uploadStatus && (
            <div className="fixed top-4 left-4 flex flex-row gap-4 items-center justify-center bg-white text-black px-3 py-4 rounded shadow">
                <img src={Success} alt="" className='bg-green-600 p-1 rounded-full'/>
                <span>{uploadStatus}</span>
            </div>
        )}
        </>
    );
};

export default CreateButton;
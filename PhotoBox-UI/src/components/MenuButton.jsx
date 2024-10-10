import { useState } from 'react';
import MenuBtn from '../assets/menu-btn.svg';
import InfoBtn from '../assets/info.svg';
import EditBtn from '../assets/edit.svg';
import DeleteBtn from '../assets/delete.svg';
import InfoModal from './InfoModal'; // Pastikan path sesuai dengan lokasi file

const MenuButton = ({ photo, fileName, size, type, createdAt }) => {
    const openModal = () => {
        // Memanggil modal dengan ID 'my_modal_2' untuk membuka modal
        document.getElementById('my_modal_2').showModal();
    };

    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="hover:bg-gray-600 duration-300 p-1 rounded-full m-1">
                    <img src={MenuBtn} alt=""/>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                        <button className='flex flex-row' onClick={openModal}>
                            <img src={InfoBtn} alt=""/>
                            <span>Info</span>
                        </button>
                    </li>
                    <li>
                        <button className='flex flex-row'>
                            <img src={EditBtn} alt=""/>
                            <span>Edit Name</span>
                        </button>
                    </li>
                    <li>
                        <button className='flex flex-row'>
                            <img src={DeleteBtn} alt=""/>
                            <span>Delete</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Include InfoModal and pass necessary props */}
            <InfoModal
                photo={photo}
                fileName={fileName}
                size={size}
                type={type}
                createdAt={createdAt}
            />
        </div>
    );
};

export default MenuButton;

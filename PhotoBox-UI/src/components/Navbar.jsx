import LogoutButton from "./LogoutButton.jsx";

const Navbar = () => {
    return (
        <div className='w-full px-4 py-3 text-white text-3xl flex flex-row items-center justify-between'>
            <h1>Photo<span className='text-button'>Box</span></h1>
            <LogoutButton />
        </div>
    );
}

export default Navbar;
import './App.css'
import HomePage from "./pages/HomePage.jsx";
import CreateButton from "./components/CreateButton.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
      <div className="bg-primary min-h-screen">
        <Navbar />
        <div className='p-5'>
            <HomePage />
            <CreateButton />
        </div>
      </div>
  )
}

export default App

import './App.css'
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {
    return (
        <>
            <Navbar/>
            <div style={{maxWidth: 960, margin: '0 auto'}}>
                <Outlet/>
            </div>
        </>
    )
}

export default App

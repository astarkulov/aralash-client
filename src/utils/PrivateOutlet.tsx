import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {FC} from "react";
import Navbar from "../components/Navbar/Navbar.tsx";

const PrivateOutlet:FC = () => {
    const auth = useAuth()
    const location = useLocation()


    return (
        <>
            <Navbar/>
            <div style={{maxWidth: 960, margin: '0 auto'}}>
                <Outlet/>
            </div>
        </>
    );
};

export default PrivateOutlet;
import {createBrowserRouter} from "react-router-dom"
import App from "../App.tsx"
import Error from "../pages/Error.tsx"
import Home from "../pages/Home/Home.tsx"
import Register from "../pages/Register/Register.tsx";
import Login from "../pages/Login/Login.tsx";
import Resumes from "../pages/Resumes/Resumes.tsx";
import ResumeLoad from "../pages/ResumeLoad/ResumeLoad.tsx";

export const router = createBrowserRouter([
        {
            path: '/',
            element: <App/>,
            errorElement: <Error/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: '/register',
                    element: <Register/>
                },

                {
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/resumes',
                    element: <Resumes/>
                },
                {
                    path: '/resumeLoad',
                    element: <ResumeLoad/>
                }
            ]
        },
    ]);
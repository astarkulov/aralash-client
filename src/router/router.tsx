import {createBrowserRouter} from "react-router-dom"
import App from "../App.tsx"
import Error from "../pages/Error.tsx"
import Home from "../pages/Home/Home.tsx"
import Register from "../pages/Register/Register.tsx";
import Login from "../pages/Login/Login.tsx";
import Resumes from "../pages/Resumes/Resumes.tsx";
import ResumeLoad from "../pages/ResumeLoad/ResumeLoad.tsx";
import Processing from "../pages/Processing/Processing.tsx";
import Profile from "../pages/Profile/Profile.tsx";
import RankingTemplate from "../pages/RankingTemplate/RankingTemplate.tsx";
import Criterion from "../pages/Criterion/Criterion.tsx";
import ProcessedResumes from "../pages/ProcessedResumes/ProcessedResumes.tsx";
import PrivateOutlet from "../utils/PrivateOutlet.tsx";

export const router = createBrowserRouter([
        {
            path: '/',
            element: <PrivateOutlet/>,
            errorElement: <Error/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: '/resumes',
                    element: <Resumes/>
                },
                {
                    path: '/resumeLoad',
                    element: <ResumeLoad/>
                },
                {
                    path: '/processing',
                    element: <Processing/>
                },
                {
                    path: '/profile/:id',
                    element: <Profile/>
                },
                {
                    path: '/template',
                    element: <RankingTemplate/>
                },
                {
                    path: '/criterion',
                    element: <Criterion/>
                },
                {
                    path: '/processedResumes',
                    element: <ProcessedResumes/>
                }
            ]
        },
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
            ]
        }
    ]);
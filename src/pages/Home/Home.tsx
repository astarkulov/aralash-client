import {useNavigate} from "react-router-dom";
import cl from './Home.module.scss'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={cl.home}>

        </div>
    );
};

export default Home;
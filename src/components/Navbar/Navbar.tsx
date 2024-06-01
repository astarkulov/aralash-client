import {NavLink, useNavigate} from 'react-router-dom';
import cl from './Navbar.module.scss';
import Burger from "./Burger/Burger.tsx";
import {useAuth} from "../../hooks/useAuth.ts";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className={cl.navbar}>
            <ul className={cl.navLinks}>
                <div>
                    <li>
                        <NavLink
                            to={'/resumeLoad'}
                        >
                            Resume Load
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/template'}>
                            Template
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/criterion'}>
                            Criterion
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/processedResumes'}>
                            ProcessedResumes
                        </NavLink>
                    </li>
                </div>
                <div>
                    <li className={cl.login} onClick={() => navigate('/login')}>
                        <NavLink
                            to={'/login'}
                            className={({isActive, isPending}) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Войти
                        </NavLink>
                    </li>
                    <li onClick={() => navigate('/register')}>
                        <NavLink
                            to={'/register'}
                            className={({isActive, isPending}) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            }
                        >
                            Регистрация
                        </NavLink>
                    </li>
                </div>
            </ul>
            <div className={cl.hamburgerMenu}>
                <Burger/>
            </div>
        </div>
    )
};

export default Navbar;

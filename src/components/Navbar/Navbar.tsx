import cl from './Navbar.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(1);
    return (
        <div className={cl.navbar}>
            <ul>
                <li>
                    <NavLink
                        to={'/resumes'}
                        className={({isActive, isPending}) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Resumes
                    </NavLink>
                </li>
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
        </div>
    );
};

export default Navbar;
import './appHeader.scss';
import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link exact to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "active" : ""}
                            end>Characters</NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            to="/comics"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
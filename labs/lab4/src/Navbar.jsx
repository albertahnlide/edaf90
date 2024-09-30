import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Navbar() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
            <NavLink className="nav-link" to="/">
                Startsida
            </NavLink>
            </li>
            <NavLink className="nav-link" to="/compose-salad">
                Komponera en sallad
            </NavLink>

            <NavLink className="nav-link" to="/view-order">
                Varukorgen
            </NavLink>
        </ul>);
}
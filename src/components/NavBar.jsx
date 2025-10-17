import { NavLink } from 'react-router-dom';

export default function NavBar() {
return (
<ul className="nav-bar">
    <li><NavLink to="/" className="navCompany">Aurion</NavLink></li>
    <li><NavLink to="/" end className={({isActive}) => isActive ? 'active' : undefined}>Home</NavLink></li>
    <li><NavLink to="/vehicles" className={({isActive}) => isActive ? 'active' : undefined}>Vehicles</NavLink></li>
    <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : undefined}>Contact</NavLink></li>
</ul>
);
}

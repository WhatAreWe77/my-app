// components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="nav">
      <img src="/download.jpg" alt="background" className="nav-bg" />
      <div className="nav-center">
        <div className="nav-brand">
          <Link to="/"><h1>Little Lemon Restaurant</h1></Link>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" className={({ isActive }) => isActive ? 'active' : ''}>
              Book Now
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
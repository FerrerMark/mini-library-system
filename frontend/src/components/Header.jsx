import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="header">
          <Link to="/">
            <div
              className="logo"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/mylogo.svg)` }}
            ></div>
          </Link>
            <h1 className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>M</h1>
            <ul className={showMenu ? 'show' : ''}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link className="search-icon-link" to="/authors" aria-label="Search authors">
                <span className="iconamoon--search-bold"></span>
                </Link></li>
            </ul>
        </div>
    );
};

export default Header;

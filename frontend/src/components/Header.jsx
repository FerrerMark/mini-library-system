import { useState } from 'react';
import '../css/header.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="header">
          <a href="/">
            <div
              className="logo"
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/mylogo.svg)` }}
            ></div>
          </a>
            <h1 className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>M</h1>
            <ul className={showMenu ? 'show' : ''}>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    );
};

export default Header;
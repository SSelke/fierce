import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className={`menu`}>
            <nav>
                <h4>Shop</h4>
                <ul className="menu-nav">
                    <li><Link to="/">All</Link></li>
                    <li><Link to="/">Accessories</Link></li>
                    <li><Link to="/">Clothing</Link></li>
                    <li><Link to="/">Sale</Link></li>
                    <li><Link to="/">Wearables</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
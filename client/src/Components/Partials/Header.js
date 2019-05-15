import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div><a href="http://www.scottwselke.com" target="_blank" rel="noopener noreferrer">Lofi Development</a></div>
                <div><Link to="/">E-Commerce Boilerplate</Link></div>
                <div className="header__links">
                    <Link to="/checkout">Checkout</Link>
                </div>
            </div>
        );
    }
}

export default Header;
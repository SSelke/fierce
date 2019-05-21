import React, { Component } from 'react';
import { handleHeaderClick } from '../../actions/ui_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Menu extends Component {

    handlePageClick = () => {
        this.props.handleHeaderClick(false, 'Menu');
    }

    render() {
        return (
            <div className={`menu`}>
                <nav>
                    <h4>Shop</h4>
                    <ul className="menu-nav" onClick={() => this.handlePageClick()}>
                        <li onClick={() => this.props.auth.login()}><Link to="/">All</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                        <li><Link to="/accessories">Accessories</Link></li>
                        <li><Link to="/clothing">Clothing</Link></li>
                        <li><Link to="/sale">Sale</Link></li>
                        <li><Link to="/wearables">Wearables</Link></li>
                    </ul>
                    <h4 className="mt-5">Help</h4>
                    <ul className="menu-nav" onClick={() => this.handlePageClick()}>
                        <li><Link to="/">Contact</Link></li>
                        <li><Link to="/">Shipping / Returning</Link></li>
                        <li><Link to="/">Privacy Disclosure</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps, { handleHeaderClick })(Menu);
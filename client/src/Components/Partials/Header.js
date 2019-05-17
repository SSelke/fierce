import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleHeaderClick } from '../../actions/ui_actions';
import { Link } from 'react-router-dom';

class Header extends Component {

    handleHeaderClick = (item) => {
        const {isMenuClosed, isCartClosed} = this.props;
        let data = null;
        if(item === 'Cart') {
            data = isCartClosed
        } else if (item === 'Menu') {
            data = isMenuClosed;
        }
        this.props.handleHeaderClick(data, item);
    }

    render() {
        
        return (
            <div className="header">
                <button onClick={() => this.handleHeaderClick('Menu')}>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    Menu
                </button>
                <div>
                    <Link to="/">FIERCE</Link>
                </div>
                <button onClick={() => this.handleHeaderClick('Cart')}>Cart(1)</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({isMenuClosed: state.headerState.isMenuClosed, isCartClosed: state.headerState.isCartClosed});

export default connect(mapStateToProps, {handleHeaderClick})(Header);
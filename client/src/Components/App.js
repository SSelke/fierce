import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleHeaderClick } from '../actions/ui_actions';
import Header from './Partials/Header';
import Checkout from './Checkout/Checkout';
import Landing from './Landing/Landing';
import Menu from './Partials/Menu';
import Cart from './Partials/Cart';

class App extends Component {

    handlePageClick = () => {
        const { isCartClosed, isMenuClosed } = this.props;
        if ( isCartClosed && isMenuClosed ) {
            return;
        } if (!isCartClosed) {
            this.props.handleHeaderClick(false, 'Cart');
        } else {
            this.props.handleHeaderClick(false, 'Menu');
        }
    }

    render() {

        const {isCartClosed, isMenuClosed} = this.props;
        return (
            <div className={`wrapper ${!isMenuClosed ? 'wrapper-open-left' : !isCartClosed ? 'wrapper-open-right' : ''}`}>
                <Menu />
                <div className={`main-container ${!isMenuClosed || !isCartClosed ? 'blur-main' : '' }`} onClick={() => this.handlePageClick()}>
                    <Header />
                    <Switch>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/" component={Landing} />
                    </Switch>
                </div>
                <Cart />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({isMenuClosed: state.headerState.isMenuClosed, isCartClosed: state.headerState.isCartClosed});

export default withRouter(connect(mapStateToProps, { handleHeaderClick })(App));
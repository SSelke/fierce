import React, { Component } from 'react';
import { Switch, Route, withRouter, Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../actions/products';
import { handleHeaderClick } from '../actions/ui_actions';
import { ProtectedRoute } from './Auth/ProtectedRoute';
import Header from './Partials/Header';
import Checkout from './Checkout/Checkout';
import Landing from './Landing/Landing';
import Menu from './Partials/Menu';
import Cart from './Partials/Cart';
import Auth from './Auth/Auth.js';
import Admin from './Admin/Admin';
import Accessories from './Accessories/Accessories';
import Clothes from './Clothes/Clothes';
import Sale from './Sale/Sale';
import Wearables from './Wearables/Wearables';
import Callback from './Callback/Callback';
import history from '../history';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
}

class AppRouter extends Component {

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
            <Router history={history}>
                <div className={`wrapper ${!isMenuClosed ? 'wrapper-open-left' : !isCartClosed ? 'wrapper-open-right' : ''}`}>
                    <Menu auth={auth}/>
                    <div className={`main-container ${!isMenuClosed || !isCartClosed ? 'blur-main' : ''}`} onClick={() => this.handlePageClick()}>
                        <Header />
                        <Switch>
                            <ProtectedRoute auth={auth} path="/admin" component={Admin} />
                            <Route path="/accessories" component={Accessories} />
                            <Route path="/clothing" component={Clothes} />
                            <Route path="/sale" component={Sale} />
                            <Route path="/wearables" component={Wearables} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/callback" render={(props) => {
                                handleAuthentication(props);
                                return <Callback {...props} />
                            }} />
                            <Route path="/" component={Landing} />
                        </Switch>
                    </div>
                    <Cart />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({isMenuClosed: state.headerState.isMenuClosed, isCartClosed: state.headerState.isCartClosed, products: state.products});

export default withRouter(connect(mapStateToProps, { handleHeaderClick, getProducts })(AppRouter));
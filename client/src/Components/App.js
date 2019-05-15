import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from './Partials/Header';
import Checkout from './Checkout/Checkout';
import Landing from './Landing/Landing';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/" component={Landing} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
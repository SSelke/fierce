import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
    render () {
        return (
            <div className={`navDrawer cart`}>
                <div className="cart-summary">
                    Looks like nothings here!
                </div>
                <button className="view-cart-button"><Link to="/">View Cart</Link></button>
                <button className="checkout-button"><Link to="/checkout">Checkout</Link></button>
            </div>
        );
    }
}

export default Cart;
import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import config from '../../../../server/config/keys';

class Checkout extends Component {

    render () {
        return (
            <StripeProvider apiKey={config.STRIPE_API_KEY}>
                    <div className="page checkout">
                        <Elements>
                            <CheckoutForm />
                        </Elements>
                    </div>
            </StripeProvider>
        );
    }
}

export default Checkout;
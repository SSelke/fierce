import React, {useState} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const CheckoutForm = (props) => {

    const [info, setInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address_line1: '',
        address_line2: '',
        address_city: '',
        address_state: '',
        address_zip: null
    });

    const [error, setError] = useState({});

    // Updating hooks

    const handleChange = (event, prop) => {
        setInfo({
            ...info,
            [prop]: event.target.value
        });
        setError({
            ...error,
            [prop]: null
        })
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        let { token } = await props.stripe.createToken({
            ...info,
            name: `${info.firstName} ${info.lastName}`
        });
        let amount = 60;
        const response = await fetch("/api/charge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, amount, ...info })
        });

        if( response.ok ) {
            alert("Payment Succesful!");
        } else {
            // Sets the errors state --- this is for input classes
            const errors = await response.json().then(json => {
                return json
            });
            setError(errors);
        }
    }

    return(
        <form onSubmit={() => {handleSubmit(event)}} className="checkout-form">
            <h2>Billing Address</h2>
            <hr />
            <div>
                <div className="checkout-name">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        required={true} 
                        onChange={() => handleChange(event, 'firstName')} 
                        className={error.firstName ? 'is-invalid' : ''}/>
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        required={true} 
                        onChange={() => handleChange(event, 'lastName')} 
                        className={error.lastName ? 'is-invalid' : ''}/>
                </div>
                <div className="checkout-street">
                    <input 
                        type="text" 
                        placeholder="Street Address" 
                        required={true} 
                        onChange={() => handleChange(event, 'address_line1')} 
                        className={error.address_line1 ? 'is-invalid' : ''}/>
                    <input 
                        type="text" 
                        placeholder="Apartment / Suite" 
                        onChange={() => handleChange(event, 'address_line2')}/>
                </div>
                <div className="checkout-address">
                    <input 
                        type="text" 
                        placeholder="City" 
                        required={true} 
                        onChange={() => handleChange(event, 'address_city')} 
                        className={error.address_city ? 'is-invalid' : ''}/>
                    {error.address_state && (<span className="invalid-feedback">{error.address_state}</span>)}
                    <select required={true} onChange={() => handleChange(event, 'address_state')} className={error.address_state ? 'is-invalid' : ''}>
                        <option value={null}>Select State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="Postal Code" 
                        required={true} 
                        onChange={() => handleChange(event, 'address_zip')} 
                        className={error.address_zip ? 'is-invalid' : ''}/>
                    <h2>Email Address</h2>
                    <hr />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        required={true} 
                        onChange={() => handleChange(event, "email")} 
                        className={error.email ? 'is-invalid' : ''}/>
                </div>
                <h2>Payment Method</h2>
                <hr />
                <div className="checkout-card">
                    <CardElement />
                </div>
                <button>Purchase</button>
            </div>
        </form>
    );
}

export default injectStripe(CheckoutForm);
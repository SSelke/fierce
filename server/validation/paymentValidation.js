const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePaymentInformation(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First Name is Required';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last Name is Required';
    }

    if (!Validator.isEmail(data.email) || Validator.isEmpty(data.email)) {
        errors.email = 'Email is Required';
    }

    if (Validator.isEmpty(data.address_line1)) {
        errors.address_line1 = "Street Address is Required";
    }

    if(Validator.isEmpty(data.address_city)) {
        errors.address_city = "City is Required";
    }

    if (Validator.isEmpty(data.address_state)) {
        errors.address_state = "State is Required";
    }

    if (Validator.isEmpty(data.address_zip)) {
        errors.address_zip = "Postal Code is Required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
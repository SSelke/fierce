const express = require('express');
const router = express.Router();
const sendMail = require('../middleware/mail.js');
const config = require('../config/keys');
const validatePayment = require('../validation/paymentValidation');
const parser = require('../middleware/cloudinary');

const stripe = require("stripe")(config.STRIPE_API_KEY_SECRET);

router.post("/charge", async (req, res) => {

    // Runs req.body top error check the inputs a second time. 
    // When handling SPI ( Sensitive Personal Data ) error checking is important

    const { errors, isValid } = validatePayment(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    try {
        let { status } = await stripe.charges.create({
            amount: req.body.amount * 100,
            currency: "usd",
            description: req.body.description,
            source: req.body.token.id,
            receipt_email: req.body.email,
            metadata: { 
                address_line1: req.body.address_line1,
                address_line2: req.body.address_line2,
                address_city: req.body.address_city,
                address_state: req.body.address_state,
                address_zip: req.body.address_zip 
            }
        });
        res.json({ status });
        await sendMail('Email Body Goes Here', 'Email Subject Line Goes Here', req.body.email);
    } catch (err) {
        res.status(500).end();
    }
});

router.post('/images', parser.single('image'), (req, res) => {
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;

    console.log(req.file);
});

module.exports = router;
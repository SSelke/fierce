const express = require('express');
const router = express.Router();
const sendMail = require('../middleware/mail.js');
const config = require('../config/keys');
const validatePayment = require('../validation/paymentValidation');
const parser = require('../middleware/cloudinary');
const secured = require('../middleware/secured');
const path = require('path');

const Product = require('../models/product');

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

router.get('/products', (req, res) => {
    Product.find({}, (error, products) => {
        if (error) {
            return res.status(400);
        }
        res.json(products);
    })
});

router.delete('/product', (req, res) => {
    Product.deleteOne({_id: req.body.id}, (error, response) => {
        console.log(response);
    });
});

router.post('/product', secured, parser.single('image'), (req, res) => {
    const image = {};
    if (req.file) {
        image.url = req.file.url;
        image.id = req.file.public_id;
    }
    Product.findOne({
        skew: req.body.skew
    }).then( product => {
        if ( product ) {
            return res.status(400).json({
                skew: 'Product Already Exists'
            });
        } else {
            const newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                photo_url: image.url || null,
                photo_id: image.id || null,
                price: req.body.price,
                category: req.body.category,
                skew: req.body.skew,
                size: req.body.size || null
            });
            console.log(newProduct);
            newProduct.save()
                      .then( product => {
                          res.sendStatus(200).end();
                      })
        }
    })
});

module.exports = router;
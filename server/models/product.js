const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    photo_url: {
        type: String,
        required: false
    },
    photo_id: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    skew: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;
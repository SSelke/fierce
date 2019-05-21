const express = require('express');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const cors = require('cors');

const app = express();


// Configure Mongoose / MongoDB
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => { console.log('Database is Connected') },
        err => { console.log("Cannot connect to database " + err) }
    );

app.use(express.urlencoded({ extended: false}));
app.use(require("body-parser").json());
app.use(express.json());
app.use(cors());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', apiRouter);

app.get("*", (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, '/public', 'index.html'));
    }
});

const PORT = process.env.PORT || 5600;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


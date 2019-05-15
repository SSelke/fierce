const express = require('express');
require('dotenv').config();
const path = require('path');
const apiRouter = require('./routes/api');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(require("body-parser").json());
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes

app.use('/api', apiRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


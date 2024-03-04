const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();
const __path = process.cwd();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__path, 'public')));

app.get('/pair', (req, res) => {
    res.sendFile(path.join(__path, '/public/pair.html'));
});

app.get('/update-session', (req, res) => {
    res.sendFile(path.join(__path, '/public/updateSession.html'));
});

let updateSession = require('./updateSession');
app.use('/sid', updateSession);

let qr = require('./qr');
app.use('/qr', qr);

let pair = require('./pair');
app.use('/code', pair);

app.get('/', (req, res) => {
    res.sendFile(path.join(__path, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
});

module.exports = app;

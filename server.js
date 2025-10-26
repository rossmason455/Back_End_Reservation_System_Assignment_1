require('dotenv').config();
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const resourceRoutes = require('./routes/resourceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
require('./mongodb_models/index');

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/resource', resourceRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Node API');
});

module.exports = app;
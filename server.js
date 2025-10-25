require('dotenv').config();
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const resourceRoutes = require('./routes/resourceRoutes');
const resource = require('./models/resource');
require('./mongodb_models/index');

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/resource', resourceRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Node API');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
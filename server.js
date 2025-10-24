require('dotenv').config();
const express = require('express');
const app = express();
const auth = require('./routes/auth');
require('./mongodb_models/index');

app.use(express.json());
app.use('/api/auth', auth);


app.get('/', (req, res) => {
    res.send('Hello from Node API');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
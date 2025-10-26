const mongoose = require('mongoose')

const dbUri = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_URL_TEST 
  : process.env.MONGO_URL;

  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log(`Connected to ${process.env.NODE_ENV || 'dev'} database`))
    .catch(() => {
         console.log("connection failed", err)
    })
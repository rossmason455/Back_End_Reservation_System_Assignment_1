const express = require ('express')
const mongoose = require ('mongoose')
const app = express()



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.get('/',(req,res) => {
res.send('Hello from Node API')
})

mongoose.connect("mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb")
  .then(() => {
        console.log("connected to database")
    })
    .catch(() => {
         console.log("connection failed")
    })
mongoose.connect("mongodb+srv://n00230645_db_user:cHH09IOEsM7mTs3l@reservationmongodb.ef34u6s.mongodb.net/reservation_mongodb?retryWrites=true&w=majority&appName=reservationmongodb")
  .then(() => {
        console.log("connected to database")
    })
    .catch(() => {
         console.log("connection failed")
    })
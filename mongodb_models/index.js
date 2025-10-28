const mongoose = require("mongoose");

const connectMongoose = async (retries = 5, delay = 2000) => {
  const dbUri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URL_TEST
      : process.env.MONGO_URL;

  while (retries > 0) {
    try {
      await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(
        `Connected to ${process.env.NODE_ENV || "dev"} MongoDB database`
      );
      return;
    } catch (err) {
      console.log(
        `Mongoose connection failed, retrying in ${delay}ms... (${retries} retries left)`
      );
      retries -= 1;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Unable to connect to MongoDB after multiple retries");
};

mongoose.connection.on("error", (err) =>
  console.log("Mongoose connection error:", err)
);

module.exports = {
  mongoose,
  connectMongoose,
};

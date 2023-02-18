const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't connect to Mongo'");
  }
};

module.exports = {
  dbConnection,
};

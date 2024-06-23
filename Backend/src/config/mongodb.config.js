const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_CLOUD, {
      dbName: process.env.DB_NAME
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("Connect successfully!!");
  } catch (error) {
    console.log("Connect failures!!", error);
  }
};

module.exports = connectMongoDB;

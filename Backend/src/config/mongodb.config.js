const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const monggoURI = process.env.MONGODB_URI_CLOUD || "mongodb://127.0.0.1:27017";
    const databaseName = process.env.DB_NAME || "SDN301";
    await mongoose.connect(monggoURI, {
      dbName: databaseName,
    });
    console.log("Connect successfully!!");
  } catch (error) {
    console.log("Connect failures!!", error);
  }
};

module.exports = connectMongoDB;

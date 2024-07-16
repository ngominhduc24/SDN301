const mongoose = require("mongoose");
const cachegoose = require("cachegoose");
const redis = require("redis");

const connectMongoDB = async () => {
  try {
    const monggoURI = process.env.MONGODB_URI_CLOUD || "mongodb://127.0.0.1:27017";
    const databaseName = process.env.DB_NAME || "SDN301";
    await mongoose.connect(monggoURI, {
      dbName: databaseName,
    });
    console.log("Connect successfully!!");

    // Configure Cachegoose to use Redis
    cachegoose(mongoose, {
      engine: 'redis',
      // host: 'localhost',
      host: process.env.REDIS_HOST || "localhost",
      port: 6379,
      // Optional: Uncomment and set the password if you have set one
      // password: 'your_redis_password'
    });

    console.log("Cachegoose configured successfully!");
  } catch (error) {
    console.log("Connect failures!!", error);
  }
};

module.exports = connectMongoDB;

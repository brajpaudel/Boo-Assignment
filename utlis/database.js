const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { profileSeeder } = require('../services/profile.service');

const connectDb = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'Boo-Profile' });
    if (mongoose.connection.readyState === 1) {
      console.log('|--------------------------------------------');
      console.log('| DataBase Url  :: ', mongoServer.getUri());
      console.log('|--------------------------------------------');
      console.log('| Database connected successfully!');
      console.log('|--------------------------------------------');
      await profileSeeder();
    } else {
      console.log('| Failed to connect to database.');
    }
  } catch (err) {
    console.log('| Error Connecting Database');
  }
};

module.exports = connectDb;

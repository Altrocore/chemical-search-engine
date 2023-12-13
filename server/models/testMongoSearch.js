const mongoose = require('mongoose');
const ChemicalElementMongoOperations = require('./mongoModel');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongoDb = mongoose.connection;

mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoDb.once('open', async () => {
  console.log('Connected to MongoDB Database');

  try {
    const searchTerm = 'Gold'; 
    const searchResults = await ChemicalElementMongoOperations.search(searchTerm);
    console.log('Search Results:', searchResults);
  } catch (error) {
    console.error('Search failed:', error);
  } finally {
    mongoose.disconnect();
  }
});

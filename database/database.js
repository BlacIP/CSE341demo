 require('dotenv').config();
 const { MongoClient, ServerApiVersion } = require('mongodb');
 const uri = process.env.MONGODB_URI;
 
 const client = new MongoClient(uri, {
   serverApi: {
     version: ServerApiVersion.v1,
     strict: true,
     deprecationErrors: true,
   }
 });
 
 let db;
 
 const connectDb = async () => {
    try {
      if (!db) {
        await client.connect();
        db = client.db(); //  specify database name here if needed: client.db('your_db_name')
        console.log('Successfully connected to MongoDB.');
      }
      return db;
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  };
 
 module.exports = connectDb ;
 
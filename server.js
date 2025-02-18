// express web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const connectDb = require('./database/database');
const userRoutes = require('./api/user'); 



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes')); 
app.use('/api/user', userRoutes);

// Since connectDb is async, we should handle it properly
const startServer = async () => {
  try {
    await connectDb();
    
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

startServer();

// connectDb()
 
// listen
// app.listen(port, () => console.log(`Server started on port ${port}`));      

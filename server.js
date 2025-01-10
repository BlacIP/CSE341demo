// express web server
const express = require('express');
const app = express();
const port = 3000;

app.use('/', require('./routes')); 
 
// listen
app.listen(port, () => console.log(`Server started on port ${port}`));      
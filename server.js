// express web server
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello Boluwatife A'));
 
// listen
app.listen(port, () => console.log(`Server started on port ${port}`));     
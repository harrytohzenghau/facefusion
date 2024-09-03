const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
  });
  
  app.get('/contact', (req, res) => {
    res.send('This is the contact page.');
  });
  

// Start the server
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});

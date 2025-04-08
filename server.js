const express = require('express');
const app = express();
const port = 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files (CSS, JS)
app.use(express.static('public'));

// Route to render your portfolio
app.get('/', (req, res) => {
  res.render('index', {
    title: 'My Portfolio',
    name: 'IKRAM'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
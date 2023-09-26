const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes/routes');
const app = express();

app.use(cors());

/**
 * Serve static files in public directory
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended:false }));
app.use('/', routes);
app.use((req, res) => { res.send("Page Not Found")});

/**
 * Set template engine to ejs
 */
app.set('view engine', 'ejs');

app.listen(5000, () => {
  console.log("Heard on 5000");
});
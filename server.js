const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create table if it doesn't exist
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)');
});

// Route to handle contact form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  db.run('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Failed to save message.');
    }
    res.status(200).send('Message saved successfully.');
  });
});

// Serve the HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port 3000`);
});

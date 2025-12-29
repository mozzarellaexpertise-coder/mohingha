// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Success!</h1><p>Your backend is live and ready!</p>');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, Gerald! Your backend is working!' });
});

app.get('/api/time', (req, res) => {
  res.json({ serverTime: new Date().toISOString() });
});

// Example Supabase-ready route (dummy for now)
app.get('/api/data', (req, res) => {
  res.json({ data: 'Your database connection will appear here.' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

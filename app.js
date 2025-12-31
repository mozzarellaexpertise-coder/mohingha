import express from "express";
import cors from "cors";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors({ origin: '*', methods: ['GET','POST'] }));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL DB!');
  }
});

// Routes

// Health check
app.get('/', (req, res) => {
  res.send('<h1>Pager King Backend Alive 🦏</h1>');
});

// Ping test
app.get('/api/ping', (req, res) => {
  res.json({ status: 'Pager King API alive 🦏' });
});

// Register device & issue token
app.post('/api/register-device', (req, res) => {
  const { device_id } = req.body;
  if (!device_id) return res.status(400).json({ error: 'device_id required' });

  const token = jwt.sign({ device_id }, SECRET, { expiresIn: '365d' });

  // Save to DB
  db.query(
    'INSERT INTO devices (device_id, token) VALUES (?, ?)',
    [device_id, token],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ token, message: 'Pager device registered 👑' });
    }
  );
});

// Optional test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, Gerald! Your backend is working!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
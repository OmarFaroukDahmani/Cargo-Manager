const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/sign-up', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully!" });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

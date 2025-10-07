const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: "https://cargodo.pages.dev",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Cargo Management API is running 🚛");
});


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
  const { userid, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? OR username=?";
  db.query(sql, [userid, userid], async (err, results) => {
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

app.post('/create', (req, res) => {
  try {
    const { user_id, tracking_number, description, status, title, origin, destination, price } = req.body;

    const sql = "INSERT INTO packages (user_id, tracking_number, description, status, title, origin, destination, price ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [user_id, tracking_number, description, status, title, origin, destination, price], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({ message: "Package created successfully!" });
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/packages/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const sql = "SELECT * FROM packages WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/edit/:id', (req, res) => {
  const packageId = req.params.id;
  const sql = "SELECT * FROM packages WHERE id = ?";
  db.query(sql, [packageId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Package not found" });
    res.json(results[0]);
  });
});

app.put('/edit/:id', (req, res) => {
  const packageId = req.params.id;
  const { title, origin, destination, price, tracking_number, description, status, user_id } = req.body;
  const sql = "UPDATE packages SET title=?, origin=?, destination=?, price=?, tracking_number=?, description=?, status=? WHERE id=? AND user_id=?";
  db.query(sql, [title, origin, destination, price, tracking_number, description, status, packageId, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Package updated successfully!" });
  });
});

app.get('/stats', (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM users) AS userCount,
      (SELECT COUNT(*) FROM packages) AS packageCount
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});




app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

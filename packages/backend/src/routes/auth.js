const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../db/pool");
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, role = "agent" } = req.body;
    if (!email || !password || password.length < 8) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const hash = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_ROUNDS, 10),
    );
    const { rows } = await pool.query(
      "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role",
      [email, hash, role],
    );
    res.status(201).json({ user: rows[0] });
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Email taken" });
    next(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Invalid input" });

  const { rows } = await pool.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = $1",
    [email],
  );
  const user = rows[0];
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAg: 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

// /me route
router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await pool.query(
      "SELECT id, email, role FROM users WHERE id = $1",
      [payload.sub],
    );
    if (!rows) {
      return res.json(401).json({ error: "User not found" });
    }
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// add logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;

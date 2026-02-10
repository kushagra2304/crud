import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
  const { name, email, password, role } = req.body;

  pool.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length > 0)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashed, role],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "User registered successfully" });
      }
    );
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      if (results.length === 0)
        return res.status(400).json({ message: "Invalid credentials" });

      const user = results[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id }, 
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
      });
    }
  );
};

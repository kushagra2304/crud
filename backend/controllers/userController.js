import pool from "../config/db.js";

export const getProfile = (req, res) => {
  pool.query(
    "SELECT id, name, email, role FROM users WHERE id=?",
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows[0]);
    }
  );
};

export const updateProfile = (req, res) => {
  const { name } = req.body;

  pool.query(
    "UPDATE users SET name=? WHERE id=?",
    [name, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Profile updated" });
    }
  );
};

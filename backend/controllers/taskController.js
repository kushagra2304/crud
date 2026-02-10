import pool from "../config/db.js";

export const createTask = (req, res) => {
  const { title, description } = req.body;

  pool.query(
    "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
    [req.user.id, title, description],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Task created" });
    }
  );
};

export const getTasks = (req, res) => {
  pool.query(
    "SELECT * FROM tasks WHERE user_id=? ORDER BY id DESC",
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows);
    }
  );
};

export const updateTask = (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  pool.query(
    "UPDATE tasks SET title=?, description=? WHERE id=? AND user_id=?",
    [title, description, id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Task updated" });
    }
  );
};

export const deleteTask = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [id, req.user.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Task deleted" });
    }
  );
};

import { useState } from "react";
import API from "../../api/axios";

export default function TaskForm({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      refreshTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleCreate} className="bg-white p-4 rounded-xl shadow space-y-2">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Add Task
      </button>
    </form>
  );
}

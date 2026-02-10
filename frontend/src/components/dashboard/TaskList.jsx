import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function TaskList({ refreshSignal }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshSignal]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEdit = async (id) => {
    await API.put(`/tasks/${id}`, {
      title: editTitle,
      description: editDesc,
    });
    setEditingId(null);
    fetchTasks();
  };

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full border p-2 rounded mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.map((task) => (
        <div key={task.id} className="border p-3 rounded mb-2">
          {editingId === task.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-1 w-full mb-1"
              />
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="border p-1 w-full mb-1"
              />
              <button
                onClick={() => saveEdit(task.id)}
                className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>

              <button
                onClick={() => startEdit(task)}
                className="text-blue-600 mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function TaskList({ refreshSignal }) {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

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

    const handleDelete = async () => {
        if (!selectedId) return;

        setDeletingId(selectedId);
        try {
            await API.delete(`/tasks/${selectedId}`);
            await fetchTasks();
        } catch (err) {
            console.error(err);
        }
        setDeletingId(null);
        setShowDeletePopup(false);
        setSelectedId(null);
    };

    const startEdit = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDesc(task.description);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditDesc("");
    };

    const saveEdit = async (id) => {
        if (!editTitle.trim()) return;
        try {
            await API.put(`/tasks/${id}`, {
                title: editTitle,
                description: editDesc,
            });
            setEditingId(null);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const filtered = tasks.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );

    const gradientBorders = [
        "from-blue-500 via-cyan-500 to-teal-500",
        "from-purple-500 via-pink-500 to-rose-500",
        "from-orange-500 via-amber-500 to-yellow-500",
        "from-green-500 via-emerald-500 to-cyan-500",
        "from-indigo-500 via-purple-500 to-pink-500",
    ];

    return (
        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-lg shadow-black/60">
            <div className="mb-5">
                <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Tasks</h3>
                    <span className="ml-3 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-800 text-gray-200">
                        {filtered.length}
                    </span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search your tasks..."
                        className="w-full bg-neutral-900/70 border border-neutral-800 px-3 pr-10 py-2.5 rounded-3xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-gray-500 text-white text-sm"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-gray-200"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-sm font-medium text-gray-300">
                            {search ? "No tasks match your search." : "You don't have any tasks yet."}
                        </p>
                    </div>
                ) : (
                    filtered.map((task, index) => {
                        const gradient = gradientBorders[index % gradientBorders.length];
                        const isEditing = editingId === task.id;
                        const isDeleting = deletingId === task.id;

                        return (
                            <div
                                key={task.id}
                                className={`rounded-xl p-4 bg-neutral-900 border border-neutral-800 transition-all ${isDeleting ? "opacity-50 scale-95" : ""
                                    }`}
                            >
                                {isEditing ? (
                                    <div className="space-y-2">
                                        <input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            className="w-full bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-white"
                                        />
                                        <textarea
                                            value={editDesc}
                                            onChange={(e) => setEditDesc(e.target.value)}
                                            className="w-full bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-gray-300"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => saveEdit(task.id)}
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="flex-1 bg-neutral-800 text-gray-300 py-2 rounded-xl"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-white font-semibold mb-1">{task.title}</h3>
                                        {task.description && (
                                            <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => startEdit(task)}
                                                className="flex-1 bg-neutral-800 text-gray-200 py-1.5 rounded-xl text-sm"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedId(task.id);
                                                    setShowDeletePopup(true);
                                                }}
                                                className="flex-1 bg-red-500/10 text-red-400 py-1.5 rounded-xl text-sm border border-red-500/20"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
            {showDeletePopup && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <h2 className="text-lg font-semibold text-white mb-2">
                            Delete Task
                        </h2>

                        <p className="text-sm text-gray-400 mb-5">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeletePopup(false)}
                                className="flex-1 py-2 rounded-xl bg-neutral-800 text-gray-200"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

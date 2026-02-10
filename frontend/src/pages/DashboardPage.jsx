import { useState } from "react";
import ProfileCard from "../components/dashboard/ProfileCard";
import TaskForm from "../components/dashboard/TaskForm";
import TaskList from "../components/dashboard/TaskList";

export default function DashboardPage() {
  const [refreshSignal, setRefreshSignal] = useState(0);

  const refreshTasks = () => {
    setRefreshSignal((prev) => prev + 1);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <ProfileCard />
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList refreshSignal={refreshSignal} />
    </div>
  );
}

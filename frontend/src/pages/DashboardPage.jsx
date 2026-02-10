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
    <div className="min-h-screen bg-black text-gray-100 p-8 space-y-6 transition-colors duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight underline underline-offset-4 decoration-indigo-500">
          Dashboard
        </h1>
        <button
  onClick={logout}
  className="bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-red-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02]"
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

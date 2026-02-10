import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ProfileCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile");
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold">Welcome, {user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-500">Role: {user.role}</p>
    </div>
  );
}

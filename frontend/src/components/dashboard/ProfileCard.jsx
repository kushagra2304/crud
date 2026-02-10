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

    if (!user) {
        return (
            <div className="bg-gradient-to-br from-black via-neutral-950 to-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-lg shadow-black/60">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-neutral-800 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-neutral-800 rounded-full w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-neutral-900 rounded-full w-1/2 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    const initial = user.name?.charAt(0).toUpperCase() || "?";

    return (
        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 shadow-lg shadow-black/50">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {initial}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-neutral-900 shadow-[0_0_6px_#22c55e]"></span>
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-white truncate mb-0.5">
                        {user.name}
                    </h2>
                </div>
                <div className="hidden sm:flex flex-col items-end text-xs text-gray-400">
                    <span>Signed in</span>
                </div>
            </div>
        </div>
    );
}
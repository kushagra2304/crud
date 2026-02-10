import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", form);

            // Save token
            localStorage.setItem("token", res.data.token);

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-gray-100 px-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg shadow-black/50">
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-white text-center underline underline-offset-4 decoration-4 decoration-indigo-500">Login</h1>
                </div>

                {error && (
                    <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? "Login..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-400">
                    Don&apos;t have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-indigo-400 hover:text-indigo-300"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

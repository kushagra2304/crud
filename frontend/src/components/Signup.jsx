import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    if (newRole) {
      setRole(newRole);
      setError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${BASE_URL}/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );

      // After signup → go to login
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <Card className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-2xl font-bold text-[#010D2A]">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Role Toggle */}
          <ToggleGroup
            type="single"
            value={role}
            onValueChange={handleRoleChange}
            className="mb-6 flex justify-center space-x-2"
          >
            <ToggleGroupItem
              value="admin"
              className={`px-4 py-2 rounded-full text-sm ${
                role === "admin"
                  ? "bg-[#010D2A] text-white border border-[#010D2A]"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Admin
            </ToggleGroupItem>

            <ToggleGroupItem
              value="stock_operator"
              className={`px-4 py-2 rounded-full text-sm ${
                role === "stock_operator"
                  ? "bg-[#010D2A] text-white border border-[#010D2A]"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Stock User
            </ToggleGroupItem>

            <ToggleGroupItem
              value="user"
              className={`px-4 py-2 rounded-full text-sm ${
                role === "user"
                  ? "bg-[#010D2A] text-white border border-[#010D2A]"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              User
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-full px-4 py-2 border border-gray-300"
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-full px-4 py-2 border border-gray-300"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-full px-4 py-2 border border-gray-300"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-[#010D2A] hover:bg-blue-950 text-white py-2 rounded-full"
            >
              Sign Up
            </Button>
          </form>

          {/* Go to Login */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer font-medium"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

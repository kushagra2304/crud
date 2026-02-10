import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("jwtToken");
  };

  return { logout, isLoggedIn };
}

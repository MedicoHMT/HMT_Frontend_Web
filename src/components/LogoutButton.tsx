import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/auth/AuthContext";

export default function LogoutButton() {
  const navigate = useNavigate();
    const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger btn-sm"
    >
      Logout
    </button>
  );
}

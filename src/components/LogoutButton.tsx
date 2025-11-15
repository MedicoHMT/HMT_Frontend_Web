import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
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

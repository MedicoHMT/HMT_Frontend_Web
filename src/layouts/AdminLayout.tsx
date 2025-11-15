import LogoutButton from "../components/LogoutButton";

export default function AdminLayout() {
  return (
    <div className="d-flex justify-content-between p-3 shadow-sm">
      <h4 className="fw-bold">Admin Dashboard</h4>
      <LogoutButton />
    </div>
  );
}
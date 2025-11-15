import LogoutButton from "../components/LogoutButton";

export default function DashboardPage() {
    return (
      <div>
      <div className="d-flex justify-content-end p-3">
        <LogoutButton />
      </div>

      <h1>Welcome to HMT Dashboard</h1>
    </div>
    );
}
import { Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const navbarHeight = 60; // px

  return (
    <div className="layout">
      {/* Fixed Top Navbar */}
      <div
        className="top-navbar d-flex justify-content-between align-items-center px-4 shadow-sm bg-light border-bottom"
        style={{
          height: `${navbarHeight}px`,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        <h5 className="m-0 fw-bold">{localStorage.getItem("hospitalName") || "Hospital Management"}</h5>
        <LogoutButton />
      </div>

      {/* Sidebar (below navbar) */}
      <Sidebar navbarHeight={navbarHeight} />

      {/* Content Area */}
      <div
        className="content-area"
        style={{
          marginLeft: "70px", // Match this to your Sidebar's collapsed width
          marginTop: `${navbarHeight}px`,
          padding: "20px",
          transition: "margin-left 0.25s ease-in-out",
        }}
      >
        {/* <Outlet /> renders the child route (e.g. Dashboard, OPD) here */}
        <Outlet />
      </div>
    </div>
  );
}
import { Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../core/auth/AuthContext";
import { Role } from "../config/constants";
import { useState } from "react";
import { AddUserModal } from "../modules/admin/components/AddUserModal";
import AddDepartmentModal from "../modules/admin/components/AddDepartmentModal";
export default function MainLayout() {
  const navbarHeight = 60; // px
  const { user, hasRole } = useAuth();

  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createTypeDoctor, setCreateTypeDoctor] = useState(false);


  const handleUserCreated = () => {
    alert("User created! ");
  };
  const handleDeptCreated = () =>{
    alert("DEpartment created!");
  }


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
        <h5 className="m-0 fw-bold">{user?.hospitalName || "Unknown"}</h5>
        {
          hasRole([Role.ADMIN]) && (
            <button className="btn btn-outline-secondary"
              onClick={() => {
                setIsModalOpen(true);
                setCreateTypeDoctor(true);
              }}
            >
              Add Doctor
            </button>
          )
        }
        {
          hasRole([Role.ADMIN]) && (
            <button className="btn btn-outline-secondary"
              onClick={() => {
                setIsModalOpen(true);
                setCreateTypeDoctor(false);
              }}
            >
              Add Employee
            </button>
          )
        }

        {
          hasRole([Role.ADMIN]) && (
            <button className="btn btn-outline-secondary"
              onClick={() => setIsDepartmentModalOpen(true)}
            >
              Create Department
            </button>
          )
        }

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

      <AddUserModal
        isOpen={isModalOpen}
        createTypeDoctor={createTypeDoctor}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUserCreated}
      />
      <AddDepartmentModal 
      isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(false)}
        onSuccess={handleDeptCreated}
      />
    </div>
  );
}
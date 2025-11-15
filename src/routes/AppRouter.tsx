import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import RoleProtectedRoute from "./RoleProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Route */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<DashboardPage />} />
                </Route>

                {/* Role Based Route Example */}
                <Route
                    path="/admin"
                    element={
                        <RoleProtectedRoute role="admin">
                            <AdminLayout />
                        </RoleProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    )
}
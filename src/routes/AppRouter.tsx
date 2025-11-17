import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RoleProtectedRoute from "./RoleProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

// Pages already in your project
import LoginPage from "../modules/auth/pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import OpdVisitList from "../modules/opd/pages/OpdVisitList";
import Patients from "../pages/Patients";
import OpdVisitDetails from "../modules/opd/pages/OpdVisitDetails";
import OpdExamine from "../modules/opd/pages/OpdExamine";

// OPD pages (lazy loaded)
const OpdHome = lazy(() => import("../modules/opd/pages/OpdHome"));
const OpdRegistration = lazy(() => import("../modules/opd/pages/OpdRegistration"));
const OpdVitals = lazy(() => import("../modules/opd/pages/OpdVitals"));
const OpdAssessment = lazy(() => import("../modules/opd/pages/OpdAssessment"));
const OpdEdit = lazy(() => import("../modules/opd/pages/OpdEdit"));
const OpdView = lazy(() => import("../modules/opd/pages/OpdView"));

export default function AppRouter() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>

                {/* ---------- Public Routes ---------- */}
                <Route path="/login" element={<LoginPage />} />

                {/* ---------- Protected Admin Layout ---------- */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* Dashboard */}
                    <Route index element={<DashboardPage />} />

                    {/* ------- OPD MODULE ROUTES ------- */}
                    <Route path="opd" element={<OpdHome />} />
                    <Route path="opd/registration" element={<OpdRegistration />} />
                    <Route path="opd/vitals" element={<OpdVitals />} />
                    <Route path="opd/assessment" element={<OpdAssessment />} />
                    <Route path="opd/edit" element={<OpdEdit />} />
                    <Route path="opd/view" element={<OpdView />} />
                    <Route path="opd/visits" element={<OpdVisitList />} />
                    <Route path="opd/visit-details" element={<OpdVisitDetails />} />
                    <Route path="opd/examine/:visitId" element={<OpdExamine />} />



                    <Route path="patients" element={<Patients />} />

                </Route>



                {/* Role Based Route Example */}
                {/* <Route
                    path="/admin"
                    element={
                        <RoleProtectedRoute role="admin">
                            <AdminLayout />
                        </RoleProtectedRoute>
                    }
                /> */}

                {/* ---------- Fallback ---------- */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </Suspense>
    );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { RouteGuard } from "../core/RouteGuard";
import type { ComponentType, ReactElement } from "react";
import React from "react";
import MainLayout from "../layout/MainLayout";

function renderElement(el?: ComponentType<any> | ReactElement | null): ReactElement | null {
  if (!el) return null;
  if (React.isValidElement(el)) return el as ReactElement;
  const Component = el as ComponentType<any>;
  return <Component />;
}

export default function AppRouter() {
  const publicRoutes = routes.filter(r => r.public);
  const protectedRoutes = routes.filter(r => !r.public);


  return (
    <Routes>


       {/* --- PUBLIC ROUTES (No Sidebar/Navbar) --- */}
      {publicRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={renderElement(r.element)}
        />
      ))}


      {/* --- PROTECTED ROUTES --- */}
      <Route element={<MainLayout />}>
        {protectedRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              <RouteGuard roles={r.roles} permission={r.permission}>
                {renderElement(r.element)}
              </RouteGuard>
            }
          />
        ))}
      </Route>



      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

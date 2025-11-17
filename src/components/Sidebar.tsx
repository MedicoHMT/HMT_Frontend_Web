import { Link, useLocation } from "react-router-dom";
import { Home, Users, FileEdit, Hospital, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

interface SidebarProps {
  navbarHeight?: number;
}

export default function Sidebar({ navbarHeight = 60 }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  // Update CSS variable for content margin
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      expanded ? "220px" : "70px"
    );
  }, [expanded]);

  const menu = [
    { name: "Home", icon: <Home size={22} />, path: "/dashboard" },
    { name: "Patients", icon: <Users size={22} />, path: "/patients" },
    { name: "OPD", icon: <FileEdit size={22} />, path: "/opd" },
    { name: "IPD", icon: <Hospital size={22} />, path: "/ipd" },
    { name: "Billing", icon: <CreditCard size={22} />, path: "/billing" },
  ];

  return (
    <div
      className={`sidebar bg-light border-end shadow-sm ${
        expanded ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
      style={{
        top: `${navbarHeight}px`, // Sidebar begins BELOW NAVBAR
        height: `calc(100vh - ${navbarHeight}px)`,
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {menu.map((item) => (
        <Link
          to={item.path}
          key={item.name}
          className={`sidebar-item ${
            location.pathname.startsWith(item.path) ? "active" : ""
          }`}
        >
          <div className="sidebar-icon">{item.icon}</div>
          {expanded && <span className="sidebar-text">{item.name}</span>}
        </Link>
      ))}
    </div>
  );
}

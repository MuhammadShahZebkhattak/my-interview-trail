import { useApp } from "../context/AppContext";

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Announcements" },
  { id: "leaderboard", label: "Simulator" },
  { id: "settings", label: "Practice" }
];

function Sidebar() {
  const { activeMenu, setActiveMenu, handleLogout } = useApp();

  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <span className="logo-mark">SkillBoard</span>
        </div>
        <nav className="nav-group">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${activeMenu === item.id ? "active" : ""}`}
              onClick={() => setActiveMenu(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <button type="button" className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;

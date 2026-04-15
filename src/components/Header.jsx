import { useApp } from "../context/AppContext";

function Header() {
  const { user } = useApp();

  return (
    <header className="header">
      <div>
        <h1 className="greeting">Hello, Dr. {user?.name ?? "User"}!</h1>
        <p className="subtle-text">Start your day with a new course.</p>
      </div>

      <div className="header-actions">
        <span className="score-badge">{Math.floor((user?.points ?? 0) / 4)}</span>
        <img
          className="avatar"
          src={user?.avatar || "https://i.pravatar.cc/120?img=14"}
          alt="User avatar"
          loading="lazy"
        />
      </div>
    </header>
  );
}

export default Header;

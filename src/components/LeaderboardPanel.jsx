import { useApp } from "../context/AppContext";

function LeaderboardPanel() {
  const { rankedLeaderboard } = useApp();

  return (
    <section className="panel leaderboard-panel">
      <div className="panel-title-row">
        <h2>LEADERBOARD</h2>
      </div>

      <div className="leaderboard-list">
        {rankedLeaderboard.map((user, index) => (
          <article key={user.id} className={`leaderboard-item ${index === 0 ? "top-user" : ""}`}>
            <div>
              <p className="rank-badge">{index + 1}</p>
              <h3>{user.name}</h3>
            </div>
            <strong>{user.score}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LeaderboardPanel;

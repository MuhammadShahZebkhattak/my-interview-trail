import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

function ProgressSection() {
  const { user } = useApp();
  const [fill, setFill] = useState(0);

  const progressValue = user?.xpGoal ? Math.min(100, Math.round((user.xp / user.xpGoal) * 100)) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setFill(progressValue), 200);
    return () => clearTimeout(timer);
  }, [progressValue]);

  return (
    <section className="panel progress-panel">
      <div className="progress-character left" />
      <div className="progress-character right" />
      <div className="panel-title-row progress-head">
        <h2>Learning Journey</h2>
      </div>
      <div className="progress-track" aria-label="XP progress">
        <span className="xp-pill start">500 XP</span>
        <div className="progress-fill" style={{ width: `${fill}%` }} />
        <span className="xp-pill marker" style={{ left: `max(12%, calc(${fill}% - 18px))` }}>
          {user?.xp ?? 0} XP
        </span>
        <span className="xp-pill goal">{user?.xpGoal ?? 0} XP</span>
      </div>
      <p className="subtle-text">{progressValue}% completed</p>
    </section>
  );
}

export default ProgressSection;

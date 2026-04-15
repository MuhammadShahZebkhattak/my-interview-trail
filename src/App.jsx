import { Suspense, lazy } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProgressSection from "./components/ProgressSection";
import ProjectList from "./components/ProjectList";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import { useApp } from "./context/AppContext";

const LeaderboardPanel = lazy(() => import("./components/LeaderboardPanel"));

function App() {
  const { activeMenu, dataState, uiMessage, dismissUiMessage, completePracticeSession } = useApp();

  if (dataState.loading) {
    return <LoadingState />;
  }

  if (dataState.error) {
    return <ErrorState message={dataState.error} />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content-wrap">
        <Header />
        <ProgressSection />
        {uiMessage ? (
          <div className="ui-message">
            <span>{uiMessage}</span>
            <button type="button" onClick={dismissUiMessage}>
              Dismiss
            </button>
          </div>
        ) : null}

        <main className={`main-grid ${activeMenu !== "dashboard" ? "single-view" : ""}`}>
          {activeMenu === "dashboard" || activeMenu === "projects" ? (
            <div className="main-left">
              <ProjectList />
            </div>
          ) : null}

          {activeMenu === "dashboard" || activeMenu === "leaderboard" ? (
            <div className="main-right">
              <Suspense fallback={<div className="panel">Loading leaderboard...</div>}>
                <LeaderboardPanel />
              </Suspense>
            </div>
          ) : null}

          {activeMenu === "settings" ? (
            <section className="panel practice-panel">
              <h2>Practice Center</h2>
              <p className="subtle-text">
                Click the button below to simulate a completed practice session and update your score.
              </p>
              <button type="button" className="practice-btn" onClick={completePracticeSession}>
                Complete Practice Session
              </button>
            </section>
          ) : null}
          {activeMenu === "projects" ? (
            <div className="main-right">
              <section className="panel">
                <h2>Project Actions</h2>
                <p className="subtle-text">
                  Select any project card to view details and switch between dashboard sections.
                </p>
              </section>
            </div>
          ) : null}
          {activeMenu === "leaderboard" ? (
            <div className="main-left">
              <section className="panel">
                <h2>Leaderboard Insights</h2>
                <p className="subtle-text">
                  User ranks are sorted by score. Top rank is highlighted automatically.
                </p>
              </section>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default App;

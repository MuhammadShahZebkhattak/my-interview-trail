import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchLeaderboard, fetchProjects, fetchUser, postNote } from "../services/mockApi";

const AppContext = createContext(null);

const initialAsyncState = {
  loading: true,
  error: ""
};

export function AppProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [notes, setNotes] = useState([]);
  const [dataState, setDataState] = useState(initialAsyncState);
  const [noteState, setNoteState] = useState({ loading: false, error: "", success: "" });
  const [uiMessage, setUiMessage] = useState("");

  useEffect(() => {
    let alive = true;
    async function loadData() {
      try {
        const [userData, projectData, leaderboardData] = await Promise.all([
          fetchUser(),
          fetchProjects(),
          fetchLeaderboard()
        ]);
        if (!alive) {
          return;
        }
        setUser(userData);
        setProjects(projectData);
        setLeaderboard(leaderboardData);
        setSelectedProjectId(projectData[0]?.id ?? null);
        setDataState({ loading: false, error: "" });
      } catch (error) {
        if (alive) {
          setDataState({ loading: false, error: error.message || "Unable to load data." });
        }
      }
    }
    loadData();
    return () => {
      alive = false;
    };
  }, []);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  );

  const rankedLeaderboard = useMemo(
    () => [...leaderboard].sort((a, b) => b.score - a.score),
    [leaderboard]
  );

  async function submitNote(text) {
    if (!selectedProjectId) {
      setNoteState((prev) => ({ ...prev, error: "Select a project first." }));
      return false;
    }

    try {
      setNoteState({ loading: true, error: "", success: "" });
      const saved = await postNote({ projectId: selectedProjectId, text });
      setNotes((prev) => [saved, ...prev]);
      setNoteState({ loading: false, error: "", success: "Note submitted successfully." });
      return true;
    } catch (error) {
      setNoteState({ loading: false, error: error.message || "Unable to submit note.", success: "" });
      return false;
    }
  }

  function dismissUiMessage() {
    setUiMessage("");
  }

  function handleLogout() {
    localStorage.removeItem("trial-dashboard-notes");
    setNotes([]);
    setSelectedProjectId(projects[0]?.id ?? null);
    setActiveMenu("dashboard");
    setNoteState({ loading: false, error: "", success: "" });
    setUiMessage("Logged out successfully.");
  }

  function completePracticeSession() {
    setUser((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        points: prev.points + 25,
        xp: Math.min(prev.xpGoal, prev.xp + 20)
      };
    });
    setUiMessage("Practice session completed. +25 points awarded.");
  }

  const value = {
    activeMenu,
    setActiveMenu,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    user,
    projects,
    rankedLeaderboard,
    notes,
    submitNote,
    handleLogout,
    completePracticeSession,
    uiMessage,
    dismissUiMessage,
    dataState,
    noteState
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider.");
  }
  return context;
}

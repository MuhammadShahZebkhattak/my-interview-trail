const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed request for ${path}`);
  }
  return response.json();
}

export async function fetchUser() {
  await delay();
  return getJson("/mock/user.json");
}

export async function fetchProjects() {
  await delay();
  return getJson("/mock/projects.json");
}

export async function fetchLeaderboard() {
  await delay();
  return getJson("/mock/leaderboard.json");
}

export async function postNote(payload) {
  await delay(550);
  if (!payload?.projectId || !payload?.text?.trim()) {
    throw new Error("Project and note text are required.");
  }

  const key = "trial-dashboard-notes";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  const created = {
    id: `note-${Date.now()}`,
    projectId: payload.projectId,
    text: payload.text.trim(),
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify([created, ...existing]));
  return created;
}

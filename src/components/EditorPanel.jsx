import { useState } from "react";
import { useApp } from "../context/AppContext";

function EditorPanel() {
  const { selectedProject, noteState, notes, submitNote } = useApp();
  const [note, setNote] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const success = await submitNote(note);
    if (success) {
      setNote("");
    }
  }

  const currentNotes = notes.filter((item) => item.projectId === selectedProject?.id);

  return (
    <section className="panel">
      <div className="panel-title-row">
        <h2>Editor</h2>
      </div>

      {selectedProject ? (
        <>
          <h3>{selectedProject.title}</h3>
          <p>{selectedProject.description}</p>
          <form onSubmit={handleSubmit} className="note-form">
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Write your project note..."
              rows={4}
              required
            />
            <button type="submit" disabled={noteState.loading}>
              {noteState.loading ? "Submitting..." : "Submit note"}
            </button>
          </form>
          {noteState.error ? <p className="feedback error">{noteState.error}</p> : null}
          {noteState.success ? <p className="feedback success">{noteState.success}</p> : null}

          <div className="notes-list">
            {currentNotes.map((item) => (
              <article className="note-card" key={item.id}>
                {item.text}
              </article>
            ))}
          </div>
        </>
      ) : (
        <p className="subtle-text">Select a project to view details.</p>
      )}
    </section>
  );
}

export default EditorPanel;

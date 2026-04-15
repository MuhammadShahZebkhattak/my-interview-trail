import { useApp } from "../context/AppContext";

function ProjectList() {
  const { projects, selectedProjectId, setSelectedProjectId } = useApp();

  return (
    <section className="panel full-height">
      <div className="panel-title-row">
        <h2>Project Tests</h2>
        <span className="subtle-text">{projects.length} cards</span>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={`project-card ${selectedProjectId === project.id ? "active" : ""}`}
            onClick={() => setSelectedProjectId(project.id)}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ProjectList;

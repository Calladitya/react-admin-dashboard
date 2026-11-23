import { useMemo, useState } from 'react';
import { CalendarDays, FolderKanban, Plus, Search, Users } from 'lucide-react';
import './WorkspacePages.css';

const initialProjects = [
  {
    id: 1,
    name: 'Website redesign',
    client: 'Northstar Studio',
    status: 'In progress',
    progress: 72,
    due: 'May 28',
    team: ['AM', 'JL', 'SK'],
    color: '#7658e8',
  },
  {
    id: 2,
    name: 'Mobile banking app',
    client: 'Union Financial',
    status: 'In progress',
    progress: 48,
    due: 'Jun 12',
    team: ['RK', 'AM'],
    color: '#3985e8',
  },
  {
    id: 3,
    name: 'Brand guidelines',
    client: 'Morrow Coffee',
    status: 'Planning',
    progress: 18,
    due: 'Jun 24',
    team: ['JL', 'TN'],
    color: '#e59a38',
  },
  {
    id: 4,
    name: 'Customer portal',
    client: 'Highspeed Inc.',
    status: 'Completed',
    progress: 100,
    due: 'May 16',
    team: ['SK', 'RK', 'AM'],
    color: '#29a779',
  },
];

const projectFilters = ['All', 'In progress', 'Planning', 'Completed'];

function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');

  const visibleProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === 'All' || project.status === filter;
      const matchesSearch = `${project.name} ${project.client}`
        .toLowerCase()
        .includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [filter, projects, search]);

  const handleCreateProject = (event) => {
    event.preventDefault();
    const name = projectName.trim();
    const client = clientName.trim();
    if (!name || !client) return;

    setProjects((currentProjects) => [
      {
        id: Date.now(),
        name,
        client,
        status: 'Planning',
        progress: 0,
        due: 'Not scheduled',
        team: ['ME'],
        color: '#7658e8',
      },
      ...currentProjects,
    ]);
    setProjectName('');
    setClientName('');
    setFilter('All');
    setSearch('');
    setShowForm(false);
  };

  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <div>
          <p className="workspace-eyebrow">WORKSPACE</p>
          <h1>Projects</h1>
          <p className="workspace-subtitle">Keep track of your team's work and progress.</p>
        </div>
        <button
          className="workspace-primary-button"
          type="button"
          onClick={() => setShowForm((isOpen) => !isOpen)}
        >
          <Plus size={17} />
          New project
        </button>
      </header>

      {showForm && (
        <form className="workspace-form" onSubmit={handleCreateProject}>
          <label>
            Project name
            <input
              autoFocus
              required
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="e.g. Website redesign"
            />
          </label>
          <label>
            Client
            <input
              required
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              placeholder="Client or team name"
            />
          </label>
          <button className="workspace-primary-button" type="submit">Create project</button>
        </form>
      )}

      <section className="workspace-panel">
        <div className="workspace-toolbar">
          <div className="workspace-filter-list" aria-label="Filter projects">
            {projectFilters.map((projectFilter) => (
              <button
                className={`workspace-filter${filter === projectFilter ? ' is-active' : ''}`}
                key={projectFilter}
                type="button"
                aria-pressed={filter === projectFilter}
                onClick={() => setFilter(projectFilter)}
              >
                {projectFilter}
                <span>
                  {projectFilter === 'All'
                    ? projects.length
                    : projects.filter((project) => project.status === projectFilter).length}
                </span>
              </button>
            ))}
          </div>
          <label className="workspace-search">
            <Search size={16} aria-hidden="true" />
            <span className="workspace-visually-hidden">Search projects</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects"
            />
          </label>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-card-top">
                <span className="project-icon" style={{ '--project-color': project.color }}>
                  <FolderKanban size={18} />
                </span>
                <span className={`project-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              <h2>{project.name}</h2>
              <p className="project-client">{project.client}</p>
              <div className="project-progress-label">
                <span>Progress</span>
                <strong>{project.progress}%</strong>
              </div>
              <div
                className="project-progress"
                role="progressbar"
                aria-label={`${project.name} progress`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={project.progress}
              >
                <span style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
              </div>
              <footer className="project-card-footer">
                <span><CalendarDays size={14} /> {project.due}</span>
                <span><Users size={14} /> {project.team.join(', ')}</span>
              </footer>
            </article>
          ))}
          {visibleProjects.length === 0 && (
            <p className="workspace-empty">No projects match your search.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Projects;

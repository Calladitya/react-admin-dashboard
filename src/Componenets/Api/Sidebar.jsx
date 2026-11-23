import './Sidebar.css';

function Sidebar({ slider, onNavigate }) {
  if (!slider) return null;

  return (
    <section className="Sidebar">
      <div className="Api_fetching">api_fetching</div>

      <ul>
        <li>
          <button type="button" className="Sidebar_link" onClick={() => onNavigate('Dashboard')}>
            Dashboard
          </button>
        </li>
        <li>
          <button type="button" className="Sidebar_link" onClick={() => onNavigate('projects')}>
            Projects
          </button>
        </li>
        <li>
          <button type="button" className="Sidebar_link" onClick={() => onNavigate('contact')}>
            Contact
          </button>
        </li>
        <li>
          <button type="button" className="Sidebar_link" onClick={() => onNavigate('analytics')}>
            Analytics
          </button>
        </li>
        <li>
          <button type="button" className="Sidebar_link" onClick={() => onNavigate('calendar')}>
            Calendar
          </button>
        </li>
        <li>
          <button type="button" className="Sidebar_link" onClick={() => onNavigate('messages')}>
            Messages
          </button>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;

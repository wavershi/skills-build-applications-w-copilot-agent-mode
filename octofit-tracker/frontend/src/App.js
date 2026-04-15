import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import octofitLogo from './octofitapp-small.png';

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar">
        <div className="container-fluid">
          <span className="navbar-brand octofit-brand d-flex align-items-center gap-2">
            <img src={octofitLogo} alt="OctoFit logo" className="octofit-brand-logo" />
            <span>OctoFit Tracker</span>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNav"
            aria-controls="octofitNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link octofit-nav-link${isActive ? ' active' : ''}`} to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link octofit-nav-link${isActive ? ' active' : ''}`} to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link octofit-nav-link${isActive ? ' active' : ''}`} to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link octofit-nav-link${isActive ? ' active' : ''}`} to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link octofit-nav-link${isActive ? ' active' : ''}`} to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
            <a
              className="btn btn-outline-light btn-sm"
              href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
              target="_blank"
              rel="noreferrer"
            >
              Bootstrap Docs
            </a>
          </div>
        </div>
      </nav>

      <main className="app-content">
        <div className="container">
          <div className="card page-card mb-4">
            <div className="card-body py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
              <div>
                <h1 className="h4 mb-1 page-title d-flex align-items-center gap-2">
                  <img src={octofitLogo} alt="OctoFit icon" className="octofit-inline-logo" />
                  <span>Frontend Dashboard</span>
                </h1>
                <p className="text-muted mb-0">Django REST data in consistent Bootstrap tables.</p>
              </div>
              <NavLink className="btn btn-primary" to="/users">
                View Data Modules
              </NavLink>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

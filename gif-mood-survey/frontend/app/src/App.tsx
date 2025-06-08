import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ResponsesPage from './pages/Response';
import ResponseByIdPage from './pages/ResponseById';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          {/* Nav bar with links to different pages */}
          <Link to="/">Survey</Link>
          <Link to="/responses">View All</Link>
          <Link to="/search">Search by ID</Link>
        </nav>

        <Routes>
          {/*Routes for each page */}
          <Route path="/" element={<Home />} />
          <Route path="/responses" element={<ResponsesPage />} />
<Route path="/search" element={<ResponseByIdPage />} />
        </Routes>
      </div>
    </Router>
  );
}

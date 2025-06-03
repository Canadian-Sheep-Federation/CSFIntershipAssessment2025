import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Form from './components/Form';
import Results from './components/Results';
import FarmDataViewer from './components/FarmDataViewer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<Form />} />
            <Route path="/results" element={<Results />} />
            <Route path="/farm-data" element={<FarmDataViewer />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Canadian Sheep Federation. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

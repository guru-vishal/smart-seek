import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Hunt from './pages/Hunt';
import ProgressDashboard from './components/ProgressDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-custom py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/hunt" element={<Hunt />} />
            <Route path="/progress" element={<ProgressDashboard />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container-custom text-center">
            <p>© {new Date().getFullYear()} Smart Seek</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
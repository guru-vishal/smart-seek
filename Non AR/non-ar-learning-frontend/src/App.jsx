import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Games from './pages/Games';
import Quiz from './pages/Quiz';
import ProgressDashboard from './components/ProgressDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/games" element={<Games />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/progress" element={<ProgressDashboard />} />
          </Routes>
        </main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>© {new Date().getFullYear()} Smart Seek</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
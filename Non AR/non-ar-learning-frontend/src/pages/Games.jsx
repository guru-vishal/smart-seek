import React from 'react';
import { Link } from 'react-router-dom';
import Games from '../components/Games';

const GamesPage = () => {
  return (
    <div className="games-page container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:underline">Home</Link> / Games
      </div>
      
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Interactive Games</h1>
        <p className="text-gray-600">Play fun games to practice your spelling and pronunciation skills!</p>
      </div>
      
      {/* Games component from components directory */}
      <Games />
    </div>
  );
};

export default GamesPage;
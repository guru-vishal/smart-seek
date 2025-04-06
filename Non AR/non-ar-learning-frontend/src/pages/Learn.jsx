import React from 'react';
import { Link } from 'react-router-dom';
import LearnObjects from '../components/LearnObjects';

const Learn = () => {
  return (
    <div className="learn-page container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:underline">Home</Link> / Learn
      </div>
      
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Learn Objects</h1>
        <p className="text-gray-600">Explore different categories and learn about objects through images, text, and audio!</p>
      </div>
      
      {/* LearnObjects component from components directory */}
      <LearnObjects />
    </div>
  );
};

export default Learn;
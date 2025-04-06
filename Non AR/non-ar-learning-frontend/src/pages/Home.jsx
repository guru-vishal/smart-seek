import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: "Learn Objects",
      description: "Discover animals, fruits, vehicles and more with images and sounds",
      icon: "🧠",
      link: "/learn",
      color: "bg-blue-100"
    },
    {
      title: "Fun Games",
      description: "Play interactive spelling and pronunciation games",
      icon: "🎮",
      link: "/games",
      color: "bg-green-100"
    },
    {
      title: "Take Quizzes",
      description: "Test your knowledge with fun quizzes",
      icon: "📝",
      link: "/quiz",
      color: "bg-yellow-100"
    },
    {
      title: "Track Progress",
      description: "See how much you've learned and your achievements",
      icon: "📈",
      link: "/progress",
      color: "bg-purple-100"
    }
  ];

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Smart Seek</h1>
        <p className="text-xl text-gray-600 mb-8">A fun way for children to learn about the world around them!</p>
        <Link to="/learn" className="btn btn-primary px-6 py-3 text-lg">Start Learning</Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <Link 
            key={index} 
            to={feature.link} 
            className="card hover:scale-105 transition-transform duration-300"
          >
            <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
              1️⃣
            </div>
            <h3 className="text-lg font-bold mb-2">Choose a Category</h3>
            <p className="text-gray-600">Select from animals, fruits, vehicles and more</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
              2️⃣
            </div>
            <h3 className="text-lg font-bold mb-2">Learn and Play</h3>
            <p className="text-gray-600">Discover objects through images, sounds, and fun facts</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
              3️⃣
            </div>
            <h3 className="text-lg font-bold mb-2">Test Your Knowledge</h3>
            <p className="text-gray-600">Take quizzes and play games to reinforce learning</p>
          </div>
        </div>
      </div>

      {/* For Parents Section */}
      <div className="bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">For Parents and Teachers</h2>
        <p className="text-gray-700 mb-4">
          KidsLearn provides a safe, engaging environment for children to learn about the world around them. 
          Monitor your child's progress and see what they're learning.
        </p>
        <Link to="/progress" className="btn btn-secondary inline-block">
          View Progress Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// Mock data for progress tracking
const mockLearningData = {
  objectsLearned: 15,
  totalObjects: 30,
  categoriesExplored: 3,
  totalCategories: 5,
  quizzesTaken: 4,
  averageScore: 85,
  recentObjects: [
    { name: "Cat", category: "Animals", date: "2025-03-15" },
    { name: "Apple", category: "Fruits", date: "2025-03-15" },
    { name: "Car", category: "Vehicles", date: "2025-03-14" },
    { name: "Dog", category: "Animals", date: "2025-03-14" },
    { name: "Banana", category: "Fruits", date: "2025-03-13" }
  ],
  quizHistory: [
    { id: 1, name: "Animal Quiz", score: 80, date: "2025-03-15" },
    { id: 2, name: "Fruit Quiz", score: 90, date: "2025-03-14" },
    { id: 3, name: "Vehicle Quiz", score: 75, date: "2025-03-13" },
    { id: 4, name: "Animal Quiz", score: 95, date: "2025-03-12" }
  ],
  achievements: [
    { id: 1, name: "First Steps", description: "Learned 5 objects", icon: "🎯", unlocked: true },
    { id: 2, name: "Explorer", description: "Explored all categories", icon: "🔍", unlocked: false },
    { id: 3, name: "Quiz Master", description: "Score 90% or higher on 3 quizzes", icon: "🏆", unlocked: true },
    { id: 4, name: "Fast Learner", description: "Learn 10 objects in one day", icon: "⚡", unlocked: true },
    { id: 5, name: "Perfect Score", description: "Get 100% on any quiz", icon: "🌟", unlocked: false }
  ],
  dailyGoals: {
    objectsToLearn: 5,
    objectsLearned: 3,
    quizzesToTake: 2,
    quizzesTaken: 1
  },
  weeklyActivity: [
    { day: "Monday", count: 8 },
    { day: "Tuesday", count: 5 },
    { day: "Wednesday", count: 10 },
    { day: "Thursday", count: 7 },
    { day: "Friday", count: 12 },
    { day: "Saturday", count: 15 },
    { day: "Sunday", count: 0 }
  ]
};

const ProgressDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isParentView, setIsParentView] = useState(false);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  
  const { 
    objectsLearned, 
    totalObjects, 
    categoriesExplored, 
    totalCategories, 
    quizzesTaken, 
    averageScore, 
    recentObjects, 
    quizHistory, 
    achievements,
    dailyGoals,
    weeklyActivity
  } = mockLearningData;

  // Calculate progress percentages
  const objectsProgress = (objectsLearned / totalObjects) * 100;
  const categoriesProgress = (categoriesExplored / totalCategories) * 100;
  const goalObjectsProgress = (dailyGoals.objectsLearned / dailyGoals.objectsToLearn) * 100;
  const goalQuizzesProgress = (dailyGoals.quizzesTaken / dailyGoals.quizzesToTake) * 100;

  const toggleParentView = () => {
    setIsParentView(!isParentView);
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="section-title mb-0">
          {isParentView ? "Parent Dashboard" : "My Progress"}
        </h1>
        <button 
          className="btn btn-secondary"
          onClick={toggleParentView}
        >
          {isParentView ? "Switch to Child View" : "Switch to Parent View"}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('history')}
        >
          Learning History
        </button>
        {isParentView && (
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'assign' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('assign')}
          >
            Assign Tasks
          </button>
        )}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats Cards */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Learning Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Objects Learned</span>
                  <span>{objectsLearned}/{totalObjects}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${objectsProgress}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Categories Explored</span>
                  <span>{categoriesExplored}/{totalCategories}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${categoriesProgress}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Quizzes Taken</span>
                  <span>{quizzesTaken}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Average Quiz Score</span>
                  <span>{averageScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${averageScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Goals */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Today's Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Objects to Learn</span>
                  <span>{dailyGoals.objectsLearned}/{dailyGoals.objectsToLearn}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: `${goalObjectsProgress}%` }}></div>
                </div>
              </div>
              <div>
              <div className="flex justify-between mb-1">
                  <span className="font-medium">Quizzes to Take</span>
                  <span>{dailyGoals.quizzesTaken}/{dailyGoals.quizzesToTake}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${goalQuizzesProgress}%` }}></div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Weekly Activity</h4>
                <div className="flex items-end h-32 justify-between">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-blue-500 rounded-t"
                        style={{ height: `${(day.count / 15) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-1">{day.day.slice(0, 1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recently Learned */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Recently Learned</h3>
            <div className="divide-y divide-gray-200">
              {recentObjects.map((object, index) => (
                <div key={index} className="py-2 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{object.name}</span>
                    <span className="ml-2 text-sm text-gray-500">{object.category}</span>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(object.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Quizzes */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Recent Quizzes</h3>
            <div className="divide-y divide-gray-200">
              {quizHistory.map((quiz, index) => (
                <div key={index} className="py-2 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{quiz.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs mr-2 ${
                      quiz.score >= 90 ? 'bg-green-100 text-green-800' :
                      quiz.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {quiz.score}%
                    </span>
                    <span className="text-sm text-gray-500">{new Date(quiz.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`card ${achievement.unlocked ? '' : 'opacity-50'}`}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{achievement.icon}</span>
                <div>
                  <h3 className="text-lg font-bold">{achievement.name}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  achievement.unlocked ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {achievement.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Learning History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Learning History</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Objects Learned</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Object
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentObjects.map((object, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{object.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{object.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(object.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Quiz History</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quiz
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quizHistory.map((quiz, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{quiz.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          quiz.score >= 90 ? 'bg-green-100 text-green-800' :
                          quiz.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {quiz.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(quiz.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Assign Tasks Tab (Parent View Only) */}
      {activeTab === 'assign' && isParentView && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Assign Learning Tasks</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="card bg-blue-50">
              <h4 className="font-semibold mb-4">Current Assignments</h4>
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 bg-white rounded">
                  <span>Learn 5 objects from Animals category</span>
                  <span className="text-sm text-gray-500">Due: Tomorrow</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-white rounded">
                  <span>Take the Fruits Quiz</span>
                  <span className="text-sm text-gray-500">Due: Today</span>
                </li>
              </ul>
            </div>
            
            <div className="card bg-green-50">
              <h4 className="font-semibold mb-4">Completed Assignments</h4>
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 bg-white rounded">
                  <span>Learn 3 objects from Vehicles category</span>
                  <span className="text-sm text-green-600">Completed</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <h4 className="font-semibold mb-4">Create New Assignment</h4>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignment Type
                </label>
                <select className="block w-full p-2 border border-gray-300 rounded-md">
                  <option>Learn Objects</option>
                  <option>Take Quiz</option>
                  <option>Play Learning Game</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="block w-full p-2 border border-gray-300 rounded-md">
                  <option>Animals</option>
                  <option>Fruits</option>
                  <option>Vehicles</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity/Goal
                </label>
                <input 
                  type="number" 
                  className="block w-full p-2 border border-gray-300 rounded-md" 
                  placeholder="How many objects to learn?"
                  min="1"
                  max="10"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input 
                  type="date" 
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="text-right">
                <button type="button" className="btn btn-primary">
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;
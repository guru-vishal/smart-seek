import { useState, useEffect } from 'react';

const ProgressDashboard = () => {
  // Mock user data for the PoC
  const [userData, setUserData] = useState({
    scannedObjects: [],
    completedChallenges: [],
    badges: []
  });

  useEffect(() => {
    // Simulating API call to get user progress data
    const mockUserData = {
      scannedObjects: [
        { id: 1, name: 'Apple', timestamp: '2023-06-15T10:30:00Z' },
        { id: 2, name: 'Book', timestamp: '2023-06-15T12:45:00Z' },
        { id: 3, name: 'Car', timestamp: '2023-06-16T09:15:00Z' },
        { id: 4, name: 'Banana', timestamp: '2023-06-16T14:20:00Z' },
        { id: 5, name: 'Ball', timestamp: '2023-06-17T11:05:00Z' },
      ],
      completedChallenges: [
        { id: 1, description: 'Find something round', timestamp: '2023-06-15T11:00:00Z' },
        { id: 2, description: 'Find something that starts with \'B\'', timestamp: '2023-06-16T13:30:00Z' },
        { id: 3, description: 'Find something red', timestamp: '2023-06-17T10:00:00Z' },
      ],
      badges: [
        { id: 1, name: 'Explorer', description: 'Scan 5 different objects', icon: '🔍', earned: true },
        { id: 2, name: 'Challenger', description: 'Complete 3 different challenges', icon: '🏆', earned: true },
        { id: 3, name: 'Quick Learner', description: 'Scan 10 objects in one day', icon: '⚡', earned: false },
        { id: 4, name: 'Naturalist', description: 'Scan 5 different plants', icon: '🌱', earned: false },
        { id: 5, name: 'Zoologist', description: 'Scan 5 different animals', icon: '🐾', earned: false }
      ]
    };
    
    setUserData(mockUserData);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Your Learning Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Stats Summary */}
        <div className="card bg-gradient-to-br from-primary to-primary/70 text-white">
          <h3 className="text-xl font-bold mb-4">Your Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-4xl font-bold">{userData.scannedObjects.length}</div>
              <div className="text-sm">Objects Scanned</div>
            </div>
            <div>
              <div className="text-4xl font-bold">{userData.completedChallenges.length}</div>
              <div className="text-sm">Challenges Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold">
                {userData.badges.filter(badge => badge.earned).length}
              </div>
              <div className="text-sm">Badges Earned</div>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            {userData.badges.map(badge => (
              <div 
                key={badge.id} 
                className={`flex items-center p-3 rounded-lg ${
                  badge.earned ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <div className="text-3xl mr-3">{badge.icon}</div>
                <div>
                  <div className="font-bold">{badge.name}</div>
                  <div className="text-xs text-gray-600">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scanned Objects */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Recently Scanned Objects</h3>
          {userData.scannedObjects.length > 0 ? (
            <ul className="divide-y">
              {userData.scannedObjects.map(obj => (
                <li key={obj.id} className="py-3 flex justify-between items-center">
                  <span className="font-medium">{obj.name}</span>
                  <span className="text-sm text-gray-500">{formatDate(obj.timestamp)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No objects scanned yet.</p>
          )}
        </div>
        
        {/* Completed Challenges */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Completed Challenges</h3>
          {userData.completedChallenges.length > 0 ? (
            <ul className="divide-y">
              {userData.completedChallenges.map(challenge => (
                <li key={challenge.id} className="py-3 flex justify-between items-center">
                  <span className="font-medium">{challenge.description}</span>
                  <span className="text-sm text-gray-500">{formatDate(challenge.timestamp)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No challenges completed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
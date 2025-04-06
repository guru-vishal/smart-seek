import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Smart Seek</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore the world around you through augmented reality. Scan objects, 
          learn their names, and discover interesting facts!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Object Scanner Card */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="text-5xl text-center mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-3 text-center">Object Scanner</h2>
          <p className="text-gray-600 mb-6">
            Point your camera at objects around you to learn their names, 
            spelling, pronunciation, and interesting facts.
          </p>
          <div className="text-center">
            <Link to="/scan" className="btn btn-primary">
              Start Scanning
            </Link>
          </div>
        </div>

        {/* AR Object Hunt Card */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="text-5xl text-center mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-3 text-center">AR Object Hunt</h2>
          <p className="text-gray-600 mb-6">
            Complete fun challenges by finding objects that match specific criteria. 
            Test your knowledge and observation skills!
          </p>
          <div className="text-center">
            <Link to="/hunt" className="btn btn-primary">
              Start Hunting
            </Link>
          </div>
        </div>

        {/* Progress Dashboard Card */}
        <div className="card hover:shadow-lg transition-shadow">
          <div className="text-5xl text-center mb-4">📊</div>
          <h2 className="text-2xl font-bold mb-3 text-center">Progress Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Track your learning journey. See which objects you've scanned, 
            challenges you've completed, and badges you've earned.
          </p>
          <div className="text-center">
            <Link to="/progress" className="btn btn-primary">
              View Progress
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gray-100 rounded-xl p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
            <p>Point your camera at an object you want to learn about.</p>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
            <p>The app will identify the object and show you its name, spelling, and pronunciation.</p>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
            <p>Learn interesting facts about the object and see it come to life with AR animations!</p>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
            <p>Complete challenges and track your progress to earn badges and rewards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
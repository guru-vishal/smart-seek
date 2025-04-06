import { useState, useRef, useEffect } from 'react';

const ObjectHunt = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Mock challenges for the PoC
  const challenges = [
    { id: 1, text: "Find something round", criteria: "round" },
    { id: 2, text: "Find something that starts with 'B'", criteria: "b" },
    { id: 3, text: "Find something red", criteria: "red" },
    { id: 4, text: "Find something you can eat", criteria: "edible" },
    { id: 5, text: "Find something made of metal", criteria: "metal" }
  ];

  // Mock object database for the PoC
  const objectDatabase = {
    apple: {
      name: 'Apple',
      properties: ['round', 'red', 'edible'],
      fact: 'Apples are a member of the rose family!',
      arModel: '🍎',
    },
    ball: {
      name: 'Ball',
      properties: ['round', 'b'],
      fact: 'The first rubber ball was made by the ancient Olmec civilization in Mexico.',
      arModel: '⚽',
    },
    book: {
      name: 'Book',
      properties: ['b', 'rectangular'],
      fact: 'The world\'s largest book is 5 feet tall and 8.06 feet wide when opened.',
      arModel: '📚',
    },
    bottle: {
      name: 'Bottle',
      properties: ['b', 'cylindrical'],
      fact: 'Glass bottles can take up to 4,000 years to decompose.',
      arModel: '🍶',
    },
    banana: {
      name: 'Banana',
      properties: ['b', 'yellow', 'edible'],
      fact: 'Bananas are berries, but strawberries aren\'t!',
      arModel: '🍌',
    },
    coin: {
      name: 'Coin',
      properties: ['round', 'metal'],
      fact: 'The first coins were made over 2,700 years ago.',
      arModel: '🪙',
    },
  };

  const generateChallenge = () => {
    const randIndex = Math.floor(Math.random() * challenges.length);
    setCurrentChallenge(challenges[randIndex]);
    setResult(null);
    setShowSuccess(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setScanning(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please check your permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const captureObject = () => {
    // In a real implementation, this would use AI/ML for object detection
    // For the PoC, we'll simulate by randomly selecting an object that matches the challenge
    const matchingObjects = Object.keys(objectDatabase).filter(key => 
      objectDatabase[key].properties.includes(currentChallenge.criteria)
    );
    
    // 75% chance of finding a matching object, 25% chance of "not matching"
    if (matchingObjects.length > 0 && Math.random() > 0.25) {
      const randomMatchingObject = matchingObjects[Math.floor(Math.random() * matchingObjects.length)];
      setResult({
        success: true,
        object: objectDatabase[randomMatchingObject]
      });
      setShowSuccess(true);
    } else {
      // Find a non-matching object
      const nonMatchingObjects = Object.keys(objectDatabase).filter(key => 
        !objectDatabase[key].properties.includes(currentChallenge.criteria)
      );
      const randomNonMatchingObject = nonMatchingObjects[Math.floor(Math.random() * nonMatchingObjects.length)];
      
      setResult({
        success: false,
        object: objectDatabase[randomNonMatchingObject]
      });
    }
    
    stopCamera();
  };

  useEffect(() => {
    // Generate a challenge when the component mounts
    if (!currentChallenge) {
      generateChallenge();
    }
    
    return () => {
      // Clean up on component unmount
      stopCamera();
    };
  }, );

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-center">AR Object Hunt</h2>
      
      {currentChallenge && !scanning && !result && (
        <div className="text-center">
          <div className="bg-accent text-white p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-2">Your Challenge:</h3>
            <p className="text-lg">{currentChallenge.text}</p>
          </div>
          
          <button 
            onClick={startCamera}
            className="btn btn-primary"
          >
            Start Hunting
          </button>
        </div>
      )}

      {scanning && (
        <div>
          <div className="relative mb-4 rounded-lg overflow-hidden aspect-video bg-gray-800">
            <video 
              ref={videoRef}
              autoPlay 
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-accent w-48 h-48 rounded-lg"></div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button 
              onClick={captureObject}
              className="btn btn-secondary"
            >
              Capture
            </button>
            <button 
              onClick={stopCamera}
              className="btn bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="text-center">
          <div className="flex justify-center items-center mb-6 h-40">
            <div className={`text-7xl ${showSuccess ? 'animate-bounce' : ''}`}>
              {result.object.arModel}
            </div>
          </div>
          
          <h3 className="text-3xl font-bold mb-2">{result.object.name}</h3>
          
          {result.success ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
              <p className="font-bold">Great job! You found a match!</p>
              <p>{result.object.fact}</p>
            </div>
          ) : (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
              <p className="font-bold">Not quite what we're looking for.</p>
              <p>Try again to find something that matches the challenge!</p>
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => {
                setResult(null);
                startCamera();
              }}
              className="btn btn-secondary"
            >
              Try Again
            </button>
            <button 
              onClick={generateChallenge}
              className="btn btn-primary"
            >
              New Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectHunt;
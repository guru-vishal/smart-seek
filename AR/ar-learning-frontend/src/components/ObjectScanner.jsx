import { useState, useRef, useEffect } from 'react';

const ObjectScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedObject, setScannedObject] = useState(null);
  const [showSpelling, setShowSpelling] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Mock object database for the PoC
  const objectDatabase = {
    apple: {
      name: 'Apple',
      fact: 'Apples are a member of the rose family and contain air, which is why they float in water!',
      arModel: '🍎', // Using emoji as placeholder for AR model
    },
    book: {
      name: 'Book',
      fact: 'The world\'s largest book is 5 feet tall and 8.06 feet wide when opened.',
      arModel: '📚',
    },
    car: {
      name: 'Car',
      fact: 'The first car was invented in 1886 by Karl Benz.',
      arModel: '🚗',
    },
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
    // For the PoC, we'll simulate by randomly selecting from our mock database
    const objects = Object.keys(objectDatabase);
    const randomObject = objects[Math.floor(Math.random() * objects.length)];
    
    setScannedObject(objectDatabase[randomObject]);
    stopCamera();
    
    // Show spelling animation
    setShowSpelling(true);
    setTimeout(() => setShowSpelling(false), 3000);
  };

  const resetScanner = () => {
    setScannedObject(null);
    setScanning(false);
  };

  const playPronunciation = () => {
    // In a real implementation, this would use text-to-speech or audio files
    alert(`Playing pronunciation for: ${scannedObject.name}`);
  };

  useEffect(() => {
    return () => {
      // Clean up on component unmount
      stopCamera();
    };
  }, []);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-center">Object Scanner</h2>
      
      {!scanning && !scannedObject && (
        <div className="text-center">
          <p className="mb-6">Point your camera at an object to learn about it</p>
          <button 
            onClick={startCamera}
            className="btn btn-primary"
          >
            Start Scanning
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

      {scannedObject && (
        <div className="text-center">
          <div className="flex justify-center items-center mb-8 h-48">
            <div className="text-6xl">{scannedObject.arModel}</div>
          </div>
          
          <h3 className="text-3xl font-bold mb-2">
            {showSpelling ? (
              <span className="animate-pulse">{scannedObject.name.split('').join(' ')}</span>
            ) : (
              scannedObject.name
            )}
          </h3>
          
          <div className="mb-6 flex justify-center">
            <button 
              onClick={playPronunciation}
              className="flex items-center gap-2 btn btn-secondary"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Listen
            </button>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h4 className="font-bold mb-1">Fun Fact:</h4>
            <p>{scannedObject.fact}</p>
          </div>
          
          <button 
            onClick={resetScanner}
            className="btn btn-primary"
          >
            Scan Another Object
          </button>
        </div>
      )}
    </div>
  );
};

export default ObjectScanner;
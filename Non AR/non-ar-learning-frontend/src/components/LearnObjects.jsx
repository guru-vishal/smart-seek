import React, { useState, useEffect } from 'react';

// Mock data for the categories and objects
const categories = [
  {
    id: 1,
    name: 'Animals',
    icon: '🐾',
    objects: [
      {
        id: 1,
        name: 'Cat',
        icon: '😺',
        fact: 'Cats can jump up to six times their length.',
        audio: '/audio/cat.mp3',
      },
      {
        id: 2,
        name: 'Dog',
        icon: '🐶',
        fact: 'Dogs can smell about 1,000 times better than humans.',
        audio: '/audio/dog.mp3',
      },
      {
        id: 3,
        name: 'Lion',
        icon: '🦁',
        fact: 'Lions are the only cats that live in groups called prides.',
        audio: '/audio/lion.mp3',
      },
    ],
  },
  {
    id: 2,
    name: 'Fruits',
    icon: '🍏',
    objects: [
      {
        id: 4,
        name: 'Apple',
        icon: '🍎',
        fact: 'Apples float in water because they are 25% air.',
        audio: '/audio/apple.mp3',
      },
      {
        id: 5,
        name: 'Banana',
        icon: '🍌',
        fact: 'Bananas are berries, but strawberries are not!',
        audio: '/audio/banana.mp3',
      },
      {
        id: 6,
        name: 'Orange',
        icon: '🍊',
        fact: 'Oranges are the most commonly grown tree fruit in the world.',
        audio: '/audio/orange.mp3',
      },
    ],
  },
  {
    id: 3,
    name: 'Vehicles',
    icon: '🚙',
    objects: [
      {
        id: 7,
        name: 'Car',
        icon: '🚗',
        fact: 'The first car was invented in 1886 by Karl Benz.',
        audio: '/audio/car.mp3',
      },
      {
        id: 8,
        name: 'Boat',
        icon: '⛵',
        fact: 'The largest boat in the world is over 1,500 feet long.',
        audio: '/audio/boat.mp3',
      },
      {
        id: 9,
        name: 'Plane',
        icon: '✈️',
        fact: 'Planes can fly up to 35,000 feet high in the sky.',
        audio: '/audio/plane.mp3',
      },
    ],
  },
];

const LearnObjects = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [animatedLetters, setAnimatedLetters] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (selectedObject) {
      setAnimatedLetters([]);
      setAnimationComplete(false);
      
      const word = selectedObject.name;
      const delay = 400;
      
      word.split('').forEach((letter, index) => {
        setTimeout(() => {
          setAnimatedLetters(prev => [...prev, letter]);
          if (index === word.length - 1) {
            setAnimationComplete(true);
          }
        }, delay * index);
      });
    }
  }, [selectedObject]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedObject(null);
  };
  
  const handleObjectClick = (object) => {
    setSelectedObject(object);
  };
  
  const handleBackClick = () => {
    if (selectedObject) {
      setSelectedObject(null);
    } else {
      setSelectedCategory(null);
    }
  };
  
  const playAudio = () => {
    if (selectedObject && selectedObject.audio) {
      // In a real application, this would play the audio file
      console.log(`Playing audio for ${selectedObject.name}`);
      // const audio = new Audio(selectedObject.audio);
      // audio.play();
      
      // For this demo, we'll just alert
      alert(`Playing pronunciation for: ${selectedObject.name}`);
    }
  };

  return (
    <div className="py-6">
      {/* Back button */}
      {(selectedCategory || selectedObject) && (
        <button 
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          onClick={handleBackClick}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}

      {/* Category Selection */}
      {!selectedCategory && (
        <>
          <h2 className="section-title">Choose a Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="card cursor-pointer hover:bg-blue-50"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-4">{category.icon}</span>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="mt-2 text-gray-600">{category.objects.length} objects</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Object Selection */}
      {selectedCategory && !selectedObject && (
        <>
          <h2 className="section-title">
            {selectedCategory.icon} {selectedCategory.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedCategory.objects.map((object) => (
              <div
                key={object.id}
                className="object-card"
                onClick={() => handleObjectClick(object)}
              >
                <div className="h-32 w-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                  {/* In a real app, this would be an actual image */}
                  <div className="text-4xl">{object.icon}</div>
                </div>
                <h3 className="text-lg font-semibold">{object.name}</h3>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Object Details */}
      {selectedObject && (
        <div className="flex flex-col items-center">
          <div className="h-64 w-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
            {/* In a real app, this would be an actual image */}
            <div className="text-6xl">{selectedObject.icon}</div>
          </div>
          
          <div className="flex items-center mb-6">
            {animatedLetters.map((letter, index) => (
              <span 
                key={index} 
                className="text-5xl font-bold mx-1 animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>

          <button 
            className="btn btn-primary flex items-center mb-6"
            onClick={playAudio}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            Hear Pronunciation
          </button>

          {animationComplete && (
            <div className="bg-yellow-100 p-4 rounded-lg max-w-md text-center">
              <h3 className="font-bold text-lg mb-2">Fun Fact:</h3>
              <p>{selectedObject.fact}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearnObjects;
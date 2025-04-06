import React, { useState } from 'react';

// Mock data for games
const gamesList = [
  {
    id: 1,
    title: "Drag and Drop Letters",
    description: "Arrange letters to form the correct word.",
    icon: "🔤",
    level: "Easy",
    component: "DragDrop",
  },
  {
    id: 2,
    title: "Fill in the Missing Letter",
    description: "Select the correct letter in a partially completed word.",
    icon: "📝",
    level: "Medium",
    component: "FillLetter",
  },
  {
    id: 3,
    title: "Listen and Choose",
    description: "Hear a pronunciation and select the corresponding object.",
    icon: "👂",
    level: "Hard",
    component: "ListenChoose",
  },
];

// Mock data for the drag and drop game
const dragDropWords = [
  {
    word: "CAT",
    icon: "😺",
    scrambled: ["T", "A", "C"],
  },
  {
    word: "DOG",
    icon: "🐶",
    scrambled: ["G", "O", "D"],
  },
  {
    word: "COW",
    icon: "🐮",
    scrambled: ["O", "C", "W"],
  },
];

// Mock data for fill in the letter game
const fillLetterWords = [
  {
    word: "APPLE",
    icon: "🍎",
    display: "A_PLE",
    options: ["P", "Q", "R", "S"],
    correctIndex: 0,
  },
  {
    word: "BANANA",
    icon: "🍌",
    display: "BA_ANA",
    options: ["M", "N", "P", "R"],
    correctIndex: 1,
  },
  {
    word: "ORANGE",
    icon: "🍊",
    display: "ORAN_E",
    options: ["M", "N", "G", "R"],
    correctIndex: 2,
  },
];

// Mock data for listen and choose game
const listenChooseWords = [
  {
    word: "CAR",
    audio: "/audio/car.mp3",
    options: [
      { name: "Car", icon: "🚗" },
      { name: "Boat", icon: "⛵" },
      { name: "Plane", icon: "✈️" },
    ],
    correctIndex: 0,
  },
];

// DragDrop Game Component
const DragDropGame = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userArrangement, setUserArrangement] = useState([]);
  const [letters, setLetters] = useState([...dragDropWords[0].scrambled]);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentWord = dragDropWords[currentWordIndex];

  const handleLetterClick = (letter, index) => {
    // Add letter to user arrangement
    setUserArrangement([...userArrangement, letter]);
    
    // Remove letter from available letters
    const newLetters = [...letters];
    newLetters.splice(index, 1);
    setLetters(newLetters);
    
    // Check if word is complete
    if (userArrangement.length === currentWord.word.length - 1) {
      setTimeout(() => {
        checkAnswer([...userArrangement, letter]);
      }, 500);
    }
  };

  const checkAnswer = (arrangement) => {
    const userWord = arrangement.join("");
    const isWordCorrect = userWord === currentWord.word;
    setIsCorrect(isWordCorrect);
  };

  const resetGame = () => {
    if (currentWordIndex < dragDropWords.length - 1) {
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);
      setLetters([...dragDropWords[nextIndex].scrambled]);
    } else {
      setCurrentWordIndex(0);
      setLetters([...dragDropWords[0].scrambled]);
    }
    
    setUserArrangement([]);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Arrange the Letters</h3>
      
      <div className="h-40 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
        <div className="text-6xl">{currentWord.icon}</div>
      </div>
      
      <div className="mb-6 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
        {userArrangement.map((letter, index) => (
          <span 
            key={index} 
            className="inline-block bg-blue-500 text-white text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-lg mx-1"
          >
            {letter}
          </span>
        ))}
        {Array(currentWord.word.length - userArrangement.length).fill('_').map((placeholder, index) => (
          <span 
            key={`placeholder-${index}`} 
            className="inline-block bg-gray-300 text-gray-300 text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-lg mx-1"
          >
            _
          </span>
        ))}
      </div>
      
      <div className="flex justify-center mb-6">
        {letters.map((letter, index) => (
          <button
            key={index}
            className="bg-yellow-500 text-white text-2xl font-bold w-12 h-12 rounded-lg mx-1 hover:bg-yellow-600 transition-colors"
            onClick={() => handleLetterClick(letter, index)}
            disabled={isCorrect !== null}
          >
            {letter}
          </button>
        ))}
      </div>
      
      {isCorrect !== null && (
        <div className={`text-center p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="text-xl font-bold mb-2">
            {isCorrect ? '🎉 Correct!' : '❌ Try Again!'}
          </p>
          <button 
            className="btn btn-primary"
            onClick={resetGame}
          >
            Next Word
          </button>
        </div>
      )}
    </div>
  );
};

// Fill Letter Game Component
const FillLetterGame = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentWord = fillLetterWords[currentWordIndex];

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    
    // Check if answer is correct
    const isAnswerCorrect = optionIndex === currentWord.correctIndex;
    setIsCorrect(isAnswerCorrect);
  };

  const resetGame = () => {
    if (currentWordIndex < fillLetterWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0);
    }
    
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Fill in the Missing Letter</h3>
      
      <div className="h-40 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
        <div className="text-6xl">{currentWord.icon}</div>
      </div>
      
      <div className="mb-6 text-center">
        <p className="text-3xl font-bold tracking-widest">{currentWord.display}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {currentWord.options.map((option, index) => (
          <button
            key={index}
            className={`p-4 text-2xl font-bold rounded-lg ${
              selectedOption === index 
                ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') 
                : 'bg-blue-100 hover:bg-blue-200'
            }`}
            onClick={() => handleOptionClick(index)}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>
      
      {isCorrect !== null && (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">
            {isCorrect ? '🎉 Correct!' : '❌ Try Again!'}
          </p>
          <button 
            className="btn btn-primary"
            onClick={resetGame}
          >
            Next Word
          </button>
        </div>
      )}
    </div>
  );
};

// Listen and Choose Game Component
const ListenChooseGame = () => {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const currentWord = listenChooseWords[0];

  const playAudio = () => {
    // In a real application, this would play the audio file
    console.log(`Playing audio for ${currentWord.word}`);
    // const audio = new Audio(currentWord.audio);
    // audio.play();
    
    // For this demo, we'll just alert
    alert(`Playing pronunciation for: ${currentWord.word}`);
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    
    // Check if answer is correct
    const isAnswerCorrect = index === currentWord.correctIndex;
    setIsCorrect(isAnswerCorrect);
  };

  const resetGame = () => {
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Listen and Choose</h3>
      
      <div className="mb-6 text-center">
        <button 
          className="btn btn-primary flex items-center mx-auto"
          onClick={playAudio}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          Listen to the Word
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {currentWord.options.map((option, index) => (
          <button
            key={index}
            className={`p-4 rounded-lg hover:bg-blue-50 ${
              selectedOption === index 
                ? (isCorrect && selectedOption === index ? 'border-2 border-green-500' : 'border-2 border-red-500') 
                : 'border border-gray-300'
            }`}
            onClick={() => handleOptionClick(index)}
            disabled={selectedOption !== null}
          >
            <div className="h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
              <div className="text-4xl">{option.icon}</div>
            </div>
            <p className="text-center font-bold">{option.name}</p>
          </button>
        ))}
      </div>
      
      {isCorrect !== null && (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">
            {isCorrect ? '🎉 Correct!' : '❌ Try Again!'}
          </p>
          <button 
            className="btn btn-primary"
            onClick={resetGame}
          >
            Next Word
          </button>
        </div>
      )}
    </div>
  );
};

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const renderSelectedGame = () => {
    switch (selectedGame?.component) {
      case 'DragDrop':
        return <DragDropGame />;
      case 'FillLetter':
        return <FillLetterGame />;
      case 'ListenChoose':
        return <ListenChooseGame />;
      default:
        return null;
    }
  };

  return (
    <div className="py-6">
      {/* Back button if game is selected */}
      {selectedGame && (
        <button 
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          onClick={() => setSelectedGame(null)}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Games
        </button>
      )}

      {/* Game Selection */}
      {!selectedGame ? (
        <>
          <h2 className="section-title">Games & Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gamesList.map((game) => (
              <div
                key={game.id}
                className="game-card cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                <div className="text-4xl mb-4 text-center">{game.icon}</div>
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                    Level: {game.level}
                  </span>
                  <button className="btn btn-primary text-sm">Play</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Render selected game
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderSelectedGame()}
        </div>
      )}
    </div>
  );
};

export default Games;
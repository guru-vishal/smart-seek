import React, { useState } from 'react';

// Mock quiz data
const quizzes = [
  {
    id: 1,
    title: "Animal Quiz",
    description: "Test your knowledge about animals!",
    icon: "🐾",
    questions: [
      {
        id: 1,
        question: "Which animal says 'Meow'?",
        options: ["Dog", "Cat", "Cow", "Duck"],
        correctAnswer: 1,
        image: "/images/cat.jpg"
      },
      {
        id: 2,
        question: "Which animal has a long neck?",
        options: ["Elephant", "Giraffe", "Lion", "Zebra"],
        correctAnswer: 1,
        image: "/images/giraffe.jpg"
      }
    ]
  },
  {
    id: 2,
    title: "Fruit Quiz",
    description: "How well do you know your fruits?",
    icon: "🍎",
    questions: [
      {
        id: 1,
        question: "Which fruit is yellow?",
        options: ["Apple", "Banana", "Strawberry", "Blueberry"],
        correctAnswer: 1,
        image: "/images/banana.jpg"
      },
      {
        id: 2,
        question: "Which fruit grows on trees?",
        options: ["Strawberry", "Apple", "Carrot", "Potato"],
        correctAnswer: 1,
        image: "/images/apple.jpg"
      }
    ]
  }
];

const QuizComponent = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    // Check if answer is correct
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  const renderQuizSelection = () => (
    <>
      <h2 className="section-title">Choose a Quiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="card cursor-pointer hover:bg-blue-50"
            onClick={() => handleQuizSelect(quiz)}
          >
            <div className="text-4xl mb-4 text-center">{quiz.icon}</div>
            <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                {quiz.questions.length} Questions
              </span>
              <button className="btn btn-primary text-sm">Start Quiz</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderQuestion = () => {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{selectedQuiz.title}</h3>
          <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
            Question {currentQuestionIndex + 1}/{selectedQuiz.questions.length}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <div className="sm:w-1/3 mb-4 sm:mb-0">
              <div className="bg-gray-200 h-32 w-32 rounded-lg flex items-center justify-center mx-auto">
                {/* In a real app, this would be an actual image */}
                <div className="text-4xl">{selectedQuiz.icon}</div>
              </div>
            </div>
            <div className="sm:w-2/3">
              <h4 className="text-lg font-bold mb-4">{currentQuestion.question}</h4>
              <div className="grid grid-cols-1 gap-2">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`p-3 rounded-lg text-left ${
                      selectedOption === index
                        ? showFeedback
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-green-100 border-2 border-green-500'
                            : 'bg-red-100 border-2 border-red-500'
                          : 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-100 hover:bg-blue-50'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center mr-2">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                      {showFeedback && index === currentQuestion.correctAnswer && (
                        <svg className="ml-auto w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showFeedback && (
            <div className={`p-4 rounded-lg ${selectedOption === currentQuestion.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="font-bold">
                {selectedOption === currentQuestion.correctAnswer ? '🎉 Correct!' : '❌ Incorrect!'}
              </p>
              <p>
                {selectedOption === currentQuestion.correctAnswer
                  ? 'Great job! You got it right!'
                  : `The correct answer is ${currentQuestion.options[currentQuestion.correctAnswer]}.`}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            className="btn btn-secondary"
            onClick={handleBackToQuizzes}
          >
            Exit Quiz
          </button>
          {showFeedback && (
            <button
              className="btn btn-primary"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < selectedQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const percentage = (score / selectedQuiz.questions.length) * 100;
    let feedback = '';
    
    if (percentage >= 80) {
      feedback = 'Excellent! You did a great job!';
    } else if (percentage >= 60) {
      feedback = 'Good work! You\'re learning well!';
    } else {
      feedback = 'Keep practicing! You\'ll get better!';
    }

    return (
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">Quiz Results</h3>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '🌱'}
          </div>
          <h4 className="text-xl font-bold mb-2">
            Your Score: {score}/{selectedQuiz.questions.length}
          </h4>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="h-4 rounded-full bg-blue-600" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-gray-700 mb-4">{feedback}</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button 
              className="btn btn-secondary w-full sm:w-auto" 
              onClick={handleRestart}
            >
              Try Again
            </button>
            <button 
              className="btn btn-primary w-full sm:w-auto" 
              onClick={handleBackToQuizzes}
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6">
      {!selectedQuiz && renderQuizSelection()}
      {selectedQuiz && !quizCompleted && renderQuestion()}
      {quizCompleted && renderResults()}
    </div>
  );
};

export default QuizComponent;
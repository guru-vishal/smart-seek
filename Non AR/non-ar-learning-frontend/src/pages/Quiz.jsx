import React from 'react';
import QuizComponent from '../components/QuizComponent';

const Quiz = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Quizzes</h1>
      <p className="text-gray-600 mb-8 text-center">
        Test your knowledge with fun and interactive quizzes!
      </p>
      <QuizComponent />
    </div>
  );
};

export default Quiz;
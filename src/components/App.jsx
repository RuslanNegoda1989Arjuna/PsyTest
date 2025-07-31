import React, { useState } from 'react';

import { questions } from '../components/question';

export const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0); // ✅ новий стейт

  const handleAnswer = (index) => {
    const correct = questions[currentQuestion].correctIndex === index;
    setSelected(index);
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount((prev) => prev + 1); // ✅ оновлення лічильника
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelected(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  if (currentQuestion >= questions.length) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ fontSize: '26px' }}
      >
        Ви завершили тест! Правильних відповідей: {correctCount} з {questions.length}
      </div>
    );
  }

  const { question, options } = questions[currentQuestion];

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-50 px-4 relative"
      style={{ fontSize: '26px' }}
    >
      {/* ✅ Лічильник у верхньому правому куті */}
      <div className="absolute top-4 right-4 bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-700 shadow-md text-xl">
        ✅ {correctCount}/{questions.length}
      </div>

      <div className="max-w-4xl w-full text-center">
        {/* Питання */}
        <div className="font-semibold mb-10 text-gray-800">
          {question}
        </div>

        {/* Варіанти відповіді */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {options.map((option, index) => {
              const isSelected = selected === index;
              const isAnswerCorrect = questions[currentQuestion].correctIndex === index;

              let bgClass = 'bg-white hover:bg-gray-100 border-gray-300';
              if (selected !== null) {
                if (isAnswerCorrect) {
                  bgClass = 'bg-green-500 text-white border-green-700';
                } else if (isSelected) {
                  bgClass = 'bg-red-500 text-white border-red-700';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-6 rounded-2xl border text-left font-medium transition-colors duration-300 ${bgClass}`}
                  style={{ margin: '6px', fontSize: '26px' }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

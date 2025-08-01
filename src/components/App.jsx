import React, { useState, useRef } from 'react';
import { questions } from '../components/question';

export const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const buttonRefs = useRef([]);

  const handleAnswer = (index) => {
    const correct = questions[currentQuestion].correctIndex === index;
    setSelected(index);
    setIsCorrect(correct);

    // Скидаємо фокус з усіх кнопок
    buttonRefs.current.forEach((btn) => btn?.blur());

    if (correct) {
      setCorrectCount((prev) => prev + 1);

      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelected(null);
        setIsCorrect(null);
      }, 1000);
    } else {
      setTimeout(() => {
        setSelected(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="flex justify-center items-center h-screen text-base sm:text-lg md:text-xl lg:text-2xl">
        Ви завершили тест! Правильних відповідей: {correctCount} з {questions.length}
      </div>
    );
  }

  const { question, options } = questions[currentQuestion];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 px-4 relative text-base sm:text-lg md:text-xl lg:text-2xl">
      {/* Лічильник правильних відповідей */}
      <div className="absolute top-4 right-4 bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-700 shadow-md text-sm sm:text-base md:text-lg">
        ✅ {correctCount}/{questions.length}
      </div>

      <div className="max-w-4xl w-full text-center">
        {/* Питання */}
        <div className="font-semibold mb-10 text-gray-800">{question}</div>

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
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 sm:p-5 md:p-6 rounded-2xl border text-left font-medium transition-colors duration-300 ${bgClass} m-1 sm:m-2 focus:outline-none`}
                  disabled={selected !== null && isCorrect}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Повідомлення "Правильно!" або "Неправильно!" */}
        {isCorrect !== null && (
          <div
            className={`mt-8 font-bold ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            } text-base sm:text-lg md:text-xl`}
          >
            {isCorrect ? '✅ Правильно!' : '❌ Неправильно. Спробуй ще раз'}
          </div>
        )}
      </div>
    </div>
  );
};

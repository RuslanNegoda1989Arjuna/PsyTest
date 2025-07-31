import React, { useState } from 'react';

const questions = [
  {
    question: 'Яка умова сприятиме кращому запам’ятовуванню дошкільником чималого переліку овочів?',
    options: [
      'Санкції за помилки у пригадуванні',
      'Змагання з однолітками',
      'Солодощі як винагорода',
      'Цікава гра «в супермаркет»'
    ],
    correctIndex: 3
  },
  {
    question: 'На якому етапі розвитку суїцидальної поведінки людина втрачає здатність переживати радість?',
    options: [
      'Пресуїцидальному',
      'Суїцидальному',
      'Постсуїцидальному',
      'Досуїцидальному'
    ],
    correctIndex: 3
  },
];

export const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (index) => {
    const correct = questions[currentQuestion].correctIndex === index;
    setSelected(index);
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelected(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="flex justify-center items-center h-screen text-4xl font-bold">
        Ви завершили тест!
      </div>
    );
  }

  const { question, options } = questions[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <div className="text-3xl font-semibold text-center mb-10 text-gray-800">
          {question}
        </div>
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[25px]">
            {options.map((option, index) => {
              const isSelected = selected === index;
              const isAnswerCorrect = questions[currentQuestion].correctIndex === index;

              let bgClass = 'bg-white hover:bg-gray-100 border-gray-300';
              if (selected !== null) {
                if (isAnswerCorrect) bgClass = 'bg-green-500 text-white border-green-700';
                else if (isSelected) bgClass = 'bg-red-500 text-white border-red-700';
              }

              return (
                <div key={index} className="w-full">
                  <button
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-6 rounded-2xl border text-left text-xl font-medium transition-colors duration-300 ${bgClass}`}
                  >
                    {option}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
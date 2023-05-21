import React, { useState, useEffect } from "react";
import "./QuizStyled.css";
import QuizSummary from "./QuizSummary";
import messagingServiceQuestions from "../questions/questions-messaging-services-selection.json";
import serviceBusQuestions from "../questions/questions-service-bus.json";
import storageAccountQuestions from "../questions/questions-storage-accounts.json";
import storageQueueQuestions from "../questions/questions-storage-queues.json";

const QuizStyled = () => {
  const initialQuizData = [
    ...messagingServiceQuestions,
    ...serviceBusQuestions,
    ...storageAccountQuestions,
    ...storageQueueQuestions,
  ];

  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Shuffle the quiz data when the component mounts
    const shuffledQuizData = shuffleArray(initialQuizData);
    setQuizData(shuffledQuizData);
    setUserAnswers(Array(shuffledQuizData.length).fill(null));
  }, []);

  const handleOptionChange = (e) => {
    const selectedOption = parseInt(e.target.value, 10);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (userAnswers[currentQuestion] !== null) {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateScore();
        setQuizCompleted(true);
      }
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quizData[index].correct_answer) {
        correctAnswers++;
      }
    });
    const calculatedScore = (correctAnswers / quizData.length) * 100;
    setScore(calculatedScore);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(Array(quizData.length).fill(null));
    setScore(0);
    setQuizCompleted(false);
  };

  const renderQuizContent = () => {
    if (!quizCompleted && quizData.length > 0) {
      return (
        <div className="question-container">
          <h2 className="question-heading">Question {currentQuestion + 1}</h2>
          <p className="question-text">{quizData[currentQuestion].question}</p>
          <form className="options-form">
            {quizData[currentQuestion].options.map((option, index) => (
              <div key={index} className="option-item">
                <label className="option-label">
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={userAnswers[currentQuestion] === index}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              </div>
            ))}
          </form>
          <button
            className={`next-button ${
              userAnswers[currentQuestion] === null ? "disabled" : ""
            }`}
            onClick={handleNextQuestion}
            disabled={userAnswers[currentQuestion] === null}
          >
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div className="results-container">
          <h2 className="results-heading">Quiz Completed!</h2>
          <p className="score-text">Your Score: {score.toFixed(2)}%</p>
          <QuizSummary quizData={quizData} userAnswers={userAnswers} />
          <button className="restart-button" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      );
    }
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className="quiz-app">
      <h1 className="title">Quiz App</h1>
      {renderQuizContent()}
    </div>
  );
};

export default QuizStyled;

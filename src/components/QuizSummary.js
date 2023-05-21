import React, { useState } from "react";
import "./QuizSummary.css";

const QuizSummary = ({
  quizData,
  userAnswers,
  categoryScores,
  score,
  restartQuiz,
}) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="results-container">
      <h2 className="results-heading">Quiz Completed!</h2>

      <div className="overall-score">
        <p className="score-text">Your Overall Score: {score.toFixed(2)}%</p>
      </div>

      <div className="category-scores">
        {Object.entries(categoryScores).map(([category, scores]) => {
          const { correctAnswers, totalQuestions } = scores;
          const categoryScore = (correctAnswers / totalQuestions) * 100;
          return (
            <div key={category} className="category-score">
              <h3 className="category-heading">{category}</h3>
              <p className="category-score-text">
                Correct Answers: {correctAnswers} / {totalQuestions}
              </p>
              <p className="category-percentage">
                Score: {categoryScore.toFixed(2)}%
              </p>
              <button
                className="review-toggle"
                onClick={() => toggleCategory(category)}
              >
                {activeCategory === category
                  ? "Hide Questions"
                  : "Review Questions"}
              </button>
              <ul
                className={`question-results ${
                  activeCategory === category ? "show" : ""
                }`}
              >
                {quizData.map((question, index) => {
                  if (question.category === category) {
                    const questionIndex = quizData.indexOf(question);
                    const answerIndex = userAnswers[questionIndex];
                    const isCorrectAnswer =
                      answerIndex === question.correct_answer;
                    return (
                      <li
                        key={index}
                        className={`answer-item ${
                          isCorrectAnswer ? "correct-answer" : "wrong-answer"
                        }`}
                      >
                        <p className="question">{question.question}</p>
                        <p className="selected-answer">
                          Your Answer: {question.options[answerIndex]}
                        </p>
                        <p className="correct-answer">
                          Correct Answer:{" "}
                          {question.options[question.correct_answer]}
                        </p>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <button className="restart-button" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizSummary;

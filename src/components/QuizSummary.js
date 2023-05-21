import React, { useState } from "react";
import "./QuizSummary.css";

const QuizSummary = ({ quizData, userAnswers }) => {
  const [showReviews, setShowReviews] = useState({});

  const toggleReview = (category) => {
    setShowReviews((prevShowReviews) => ({
      ...prevShowReviews,
      [category]: !prevShowReviews[category],
    }));
  };

  const renderCategoryScores = () => {
    const categoryScores = {};
    quizData.forEach((question, index) => {
      const category = question.category;
      const answer = userAnswers[index];
      const isCorrect = answer === question.correct_answer;

      if (!categoryScores[category]) {
        categoryScores[category] = {
          totalQuestions: 0,
          correctAnswers: 0,
          questions: [],
        };
      }

      categoryScores[category].totalQuestions++;
      if (isCorrect) {
        categoryScores[category].correctAnswers++;
      }

      categoryScores[category].questions.push({
        question: question.question,
        isCorrect: isCorrect,
        userAnswer: question.options[answer],
        correctAnswer: question.options[question.correct_answer],
      });
    });

    return Object.entries(categoryScores).map(([category, score], index) => (
      <div className="category-score" key={index}>
        <div className="category-header" onClick={() => toggleReview(category)}>
          <h3 className="category-title">{category}</h3>
          <button className="review-toggle-button">
            {showReviews[category] ? "Hide Questions" : "Review Questions"}
          </button>
        </div>
        {showReviews[category] && (
          <>
            <p className="category-result">
              Correct: {score.correctAnswers} / {score.totalQuestions}
            </p>
            <ul className="questions-list">
              {score.questions.map((question, index) => (
                <li key={index} className="question-item">
                  <p
                    className={`question ${
                      question.isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    {question.question}
                  </p>
                  <p className="selected-answer">
                    Your Answer: {question.userAnswer}
                  </p>
                  <p className="correct-answer">
                    Correct Answer: {question.correctAnswer}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="quiz-summary">
      <h2 className="summary-heading">Quiz Summary</h2>
      {renderCategoryScores()}
    </div>
  );
};

export default QuizSummary;

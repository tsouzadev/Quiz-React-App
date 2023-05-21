import React from "react";

const QuizSummaryOverallScore = ({ correctAnswers, totalQuestions }) => {
  const calculatePercentage = () => {
    if (totalQuestions === 0) {
      return 0;
    }
    return ((correctAnswers / totalQuestions) * 100).toFixed(2);
  };

  return (
    <div className="overall-score">
      <h3 className="overall-title">Overall Score</h3>
      <p className="overall-result">
        Correct: {correctAnswers} / {totalQuestions}
      </p>
      <div className="overall-chart">
        <div
          className="chart-progress"
          style={{ width: `${calculatePercentage()}%` }}
        ></div>
      </div>
      <p className="overall-percentage">{calculatePercentage()}%</p>
    </div>
  );
};

export default QuizSummaryOverallScore;

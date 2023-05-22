import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizFilter.css";

const QuizFilter = ({ questions, onQuestionsFiltered }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(10);

  useEffect(() => {
    // Extract all distinct categories from the questions
    const allCategories = questions.reduce((acc, question) => {
      if (!acc.includes(question.category)) {
        return [...acc, question.category];
      }
      return acc;
    }, []);
    setCategories(allCategories);
  }, [questions]);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategories(selectedOptions);
  };

  const handleAmountChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setSelectedAmount(selectedValue);
  };

  const handleStartQuiz = () => {
    // Filter questions based on selected categories
    let filtered = questions;
    if (selectedCategories.length > 0) {
      filtered = questions.filter((question) =>
        selectedCategories.includes(question.category)
      );
    }

    // Randomly select the desired amount of questions
    const selectedQuestions = filtered
      .sort(() => Math.random() - Math.random())
      .slice(0, selectedAmount);

    onQuestionsFiltered(selectedQuestions);

    // Redirect to Quiz component with the filtered questions
    navigate("/quiz", { state: { questions: selectedQuestions } });
  };

  return (
    <div className="quiz-filter">
      <h2>Quiz Filter</h2>
      <div className="filter-section">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label htmlFor="amount">Select Amount:</label>
        <select
          id="amount"
          value={selectedAmount}
          onChange={handleAmountChange}
        >
          {Array.from(
            { length: questions.length / 10 },
            (_, index) => (index + 1) * 10
          ).map((amount) => (
            <option key={amount} value={amount}>
              {amount}
            </option>
          ))}
        </select>
      </div>
      <button className="start-button" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizFilter;

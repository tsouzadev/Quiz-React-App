import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizFilter from "./components/QuizFilter";
import Quiz from "./components/Quiz";

import messagingServiceQuestions from "./questions/questions-messaging-services-selection.json";
import serviceBusQuestions from "./questions/questions-service-bus.json";
import storageAccountQuestions from "./questions/questions-storage-accounts.json";
import storageQueueQuestions from "./questions/questions-storage-queues.json";
import eventHubQuestions from "./questions/questions-event-hub.json";

const App = () => {
  const initialQuizData = [
    ...messagingServiceQuestions,
    ...serviceBusQuestions,
    ...storageAccountQuestions,
    ...storageQueueQuestions,
    ...eventHubQuestions,
  ];

  const [filteredQuestions, setFilteredQuestions] = useState(initialQuizData);

  const onQuestionFilteredHandler = (questions) => {
    setFilteredQuestions(questions);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <QuizFilter
                questions={initialQuizData}
                onQuestionsFiltered={onQuestionFilteredHandler}
              />
            }
          />
          <Route
            exact
            path="/quiz"
            element={<Quiz questions={filteredQuestions} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/app.scss"

import Welcome from "./components/Welcome";
import Quiz from "./components/Quiz";
import QuizResults from "./components/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/Quiz" element={<Quiz />} />
      <Route path="/Quiz-Results" element={<QuizResults />} />
      
    </Routes>
  );
}

export default App;

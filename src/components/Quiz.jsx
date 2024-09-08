import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { fetchQuestions } from "../api/api";

import "../styles/quiz.scss";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isClickable, setIsClickable] = useState(false); // Şıkların tıklanabilirliği
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null || "No answer"); // Seçilen cevabı kaydetmek için

  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === 10) {
      navigate("/Quiz-Results", { state: { answers }, replace: true });
      return;
    }

    // Şıkları 10 saniye sonra aktif yapacak timer
    const clickTimer = setTimeout(() => {
      setIsClickable(true);
    }, 10000);

    // Zamanlayıcı ve otomatik geçiş ayarları
    const timer = setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeRemaining(30);
      setSelectedAnswer(null);
      setIsClickable(false); // Şıkları tekrar devre dışı bırak
    }, 30000);

    const countdown = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    // Temizleme fonksiyonları
    return () => {
      clearTimeout(timer);
      clearTimeout(clickTimer);
      clearInterval(countdown);
    };
  }, [currentQuestionIndex]);

  const parseChoices = (body) => {
    const sentences = body.split("\n");
    return sentences.slice(0, 4);
  };

  const handleAnswer = (choice) => {
    if (isClickable) {
      setSelectedAnswer(choice); // Seçilen cevabı kaydet
      setAnswers((prev) => {
        const updatedAnswers = [...prev];
        updatedAnswers[currentQuestionIndex] = {
          id: questions[currentQuestionIndex].id,
          question: questions[currentQuestionIndex].title,
          answer: choice || "No Answer",
        };
        return updatedAnswers;
      });
    }
  };

  const letterChoices = ["A", "B", "C", "D"];
  if (currentQuestionIndex >= questions.length) return null;

  return (
    <div className="question-container">
      <div className="question-title">
        <Typography variant="h4">
          {questions[currentQuestionIndex]?.id}-
          {questions[currentQuestionIndex]?.title}
        </Typography>
        <div className="question-choices">
          {parseChoices(questions[currentQuestionIndex]?.body || "").map(
            (choice, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleAnswer(choice)}
                disabled={!isClickable} // İlk 10 saniye boyunca butonlar deaktif olacak
              >
                {letterChoices[index]}-{choice}
              </Button>
            )
          )}
        </div>
        <Typography>Time: {timeRemaining} seconds</Typography>
      </div>
    </div>
  );
};

export default Quiz;

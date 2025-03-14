"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";

export default function QuizScreen({ questions, setQuizStarted }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(answer);
    setShowCorrectAnswer(true);

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      setCurrentQuestion(currentQuestion + 1);
    }, 1000);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h2 className="mb-4 text-4xl font-bold">The End!</h2>
        <p className="mb-12 text-6xl">
          You scored: {score} / {questions.length}
        </p>

        <Button variant="secondary" onClick={() => setQuizStarted(false)}>
          Play Again
        </Button>
      </div>
    );
  }

  return (
    <motion.div className="mx-auto flex min-h-screen flex-col items-center justify-center p-6 text-white">
      <h2
        className="mb-20 text-center text-xl font-bold lg:text-4xl"
        dangerouslySetInnerHTML={{
          __html: questions[currentQuestion].question,
        }}
      ></h2>

      <div className="grid grid-cols-2 gap-x-16 gap-y-8">
        {[
          ...questions[currentQuestion].incorrect_answers,
          questions[currentQuestion].correct_answer,
        ]
          .sort()
          .map((answer, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(answer)}
              className={`rounded border lg:px-20 lg:py-12 lg:text-4xl ${selectedAnswer === answer ? "bg-[#0a0a0a]" : "bg-[#0a0a0a] hover:bg-[#0a0a0a]/60"} ${showCorrectAnswer && answer === questions[currentQuestion].correct_answer ? "bg-emerald-500" : ""}`}
              variant={`${selectedAnswer === answer ? "emerald" : "secondary"} ${showCorrectAnswer && answer === questions[currentQuestion].correct_answer ? "emerald" : "ghost"}`}
              dangerouslySetInnerHTML={{ __html: answer }}
            ></Button>
          ))}
      </div>
    </motion.div>
  );
}

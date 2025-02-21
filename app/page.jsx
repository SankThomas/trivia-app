"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import QuizScreen from "@/components/quizscreen";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("medium");
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      setCategories(data.trivia_categories);
    };

    getQuestions();
  }, []);

  const startQuiz = async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`,
    );
    const data = await res.json();
    setQuestions(data.results);
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col items-center justify-center rounded-lg border p-6"
      >
        <div className="rounded-2xl border p-6">
          <h1 className="mb-4 text-center text-4xl font-bold">Quiz Time</h1>

          <div className="w-full max-w-md space-y-4">
            <div>
              <Label>Select category:</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[450px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select difficulty:</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={startQuiz} variant="outline">
              Start Quiz
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return <QuizScreen questions={questions} setQuizStarted={setQuizStarted} />;
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  explanation?: string;
}

const QuizGame: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();

      if (data && data?.results && Array.isArray(data?.results)) {
        setQuestions(
          data.results.map((result: Question) => ({
            ...result,
            explanation:
              "Add your explanation here if available in the API response",
          }))
        );
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowNextButton(false);
        setShowSubmitButton(false);
      } else {
        console.error(
          "API response does not have the expected structure:",
          data
        );
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === questions[currentQuestionIndex]?.correct_answer);
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowNextButton(false);
      setShowSubmitButton(false);

      if (currentQuestionIndex === questions.length - 2) {
        setShowSubmitButton(true);
      }
    }
  };

  const handleSubmit = () => {
    const totalCorrect = questions?.filter(
      (q) => q?.correct_answer === selectedAnswer
    ).length;
    console.log(totalCorrect, "totalCorrect");

    const totalIncorrect = questions?.length - totalCorrect;

    // After click submit button navigate to result page
    navigate("/result", {
      state: { totalCorrect, totalIncorrect },
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxWidth: 600,
          margin: "auto",
          backgroundColor: "#cc",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: 2, textAlign: "center", color: "#1E88E5" }}
        >
          Quiz App
        </Typography>
        {questions?.length > 0 && currentQuestionIndex < questions.length && (
          <div>
            <Typography variant="h6" sx={{ marginBottom: 2, color: "#757575" }}>
              Category: {questions[currentQuestionIndex]?.category}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2, color: "#757575" }}>
              Difficulty: {questions[currentQuestionIndex]?.difficulty}
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: 2, color: "#212121" }}>
              {questions[currentQuestionIndex].question}
            </Typography>
            <RadioGroup>
              {[
                ...questions[currentQuestionIndex].incorrect_answers,
                questions[currentQuestionIndex]?.correct_answer,
              ].map((answer, index) => (
                <FormControlLabel
                  key={index}
                  value={answer}
                  control={<Radio color="primary" />}
                  label={answer}
                  disabled={selectedAnswer !== null}
                  checked={selectedAnswer === answer}
                  onChange={() => handleOptionSelect(answer)}
                  sx={{ marginBottom: 1 }}
                />
              ))}
            </RadioGroup>
            {selectedAnswer !== null && (
              <div>
                {isCorrect ? (
                  <Typography variant="body1" sx={{ color: "#4CAF50" }}>
                    Correct!
                  </Typography>
                ) : (
                  <div>
                    <Typography variant="body1" sx={{ color: "#FF5252" }}>
                      Incorrect! The correct answer is{" "}
                      {questions[currentQuestionIndex].correct_answer}.
                    </Typography>
                    {questions[currentQuestionIndex].explanation && (
                      <Typography variant="body1" sx={{ color: "#757575" }}>
                        {questions[currentQuestionIndex].explanation}
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            )}
            {showNextButton && currentQuestionIndex < questions.length - 1 && (
              <Button
                data-testid="Next_question_btn"
                variant="contained"
                onClick={handleNextQuestion}
                sx={{
                  marginTop: 2,
                  backgroundColor: "#1E88E5",
                  color: "#FFFFFF",
                }}
              >
                Next Question
              </Button>
            )}
            {showSubmitButton &&
              currentQuestionIndex === questions.length - 1 && (
                <Button
                  data-testid="submit_btn"
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#4CAF50",
                    color: "#FFFFFF",
                  }}
                >
                  Submit
                </Button>
              )}
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default QuizGame;

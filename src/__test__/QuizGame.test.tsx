import { render, screen, fireEvent, act } from "@testing-library/react";
import QuizGame from "../Components/QuizGame";

describe("QuizGame Component", () => {
  test("renders QuizGame component", async () => {
    render(<QuizGame />);
    expect(screen.getByText("Quiz App")).toBeInTheDocument();
  });

  test("fetches questions and renders the first question", async () => {
    // Mock the fetch function to simulate API call
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [
          {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "easy",
            question: "Sample Question?",
            correct_answer: "Correct Answer",
            incorrect_answers: "Incorrect Answer 1",
          },
        ],
      }),
    });

    render(<QuizGame />);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Difficulty")).toBeInTheDocument();

    await act(async () => {});

    // Check if the question is rendered
    expect(screen.getByText(/Sample Question\?/i)).toBeInTheDocument();
  });

  test("selects an option, shows feedback, and navigates to the next question", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [
          {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "easy",
            question: "Sample Question?",
            correct_answer: "Correct Answer",
            incorrect_answers: "Incorrect Answer 1",
          },
        ],
      }),
    });

    render(<QuizGame />);

    // Wait for the API call to be completed
    await act(async () => {});

    // Select an option
    fireEvent.click(screen.getByLabelText(/Incorrect Answer 1/i));

    // Check if feedback is displayed
    expect(
      screen.getByText(/Incorrect! The correct answer is Correct Answer/i)
    ).toBeInTheDocument();

    // Check if the "Next Question" button is rendered
    expect(screen.getByTestId("Next_question_btn")).toBeInTheDocument();

    // Click "Next Question"
    fireEvent.click(screen.getByTestId("Next_question_btn"));

    // Check if the next question is rendered
    expect(screen.getByText(/Sample Question\?/i)).toBeInTheDocument();
  });

  test("submits the quiz and navigates to the result page", async () => {
    // Mock the fetch function to simulate API call
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        results: [
          {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "easy",
            question: "Sample Question?",
            correct_answer: "Correct Answer",
            incorrect_answers: "Incorrect Answer 1",
          },
        ],
      }),
    });

    render(<QuizGame />);

    // Wait for the API call to be completed
    await act(async () => {});

    // Select an option
    fireEvent.click(screen.getByLabelText(/Incorrect Answer 1/i));

    // Click the "Next Question"
    fireEvent.click(screen.getByTestId("Next_question_btn"));

    // Submit the quiz
    fireEvent.click(screen.getByTestId("submit_btn"));
  });
});

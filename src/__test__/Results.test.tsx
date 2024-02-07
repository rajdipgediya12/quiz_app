import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Results from "../Components/Results";

describe("Results component", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/results"]}>
        <Route path="/results">
          <Results />
        </Route>
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
  });

  it("displays quiz results correctly", () => {
    const MocktotalCorrect = 8;
    const MocktotalIncorrect = 2;

    const { getByText } = render(
      <MemoryRouter
        initialEntries={["/results"]}
        initialIndex={0}
      ></MemoryRouter>
    );

    expect(getByText("Quiz Results")).toBeInTheDocument();
    expect(
      getByText(
        `Total Questions Served: ${MocktotalCorrect + MocktotalIncorrect}`
      )
    ).toBeInTheDocument();
    expect(
      getByText(`Total Correct Questions: ${MocktotalCorrect}`)
    ).toBeInTheDocument();
    expect(
      getByText(`Total Incorrect Questions: ${MocktotalIncorrect}`)
    ).toBeInTheDocument();
  });
});

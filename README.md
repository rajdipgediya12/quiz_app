# Getting Started with Create React App

Make sure you have Node.js and npm installed on your machine.

## Clone the repository:

git clone https://github.com/rajdipgediya12/quiz-app.git
cd quiz-app

## Install dependencies:
npm install

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Features
Display one question at a time.
Show multiple answer options below each question.
Users can choose an option and submit their answer.
Immediate feedback on the correctness of the answer.
Display the correct answer with an explanation if the user's answer is incorrect.
Next button to move to the next question after the answer is displayed.
After answering all 10 questions, redirect to the results page.
Results page displays total questions served, total correct questions, and total incorrect questions.

## Implementation Details
The application is built using React with functional components for modularity.
Basic validations are implemented to ensure smooth user interaction.
The code is written in TypeScript for better type safety.
Jest tests are included to validate the functionality.
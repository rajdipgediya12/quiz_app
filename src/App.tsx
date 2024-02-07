import React from "react";
import ReactDOM from "react-dom";
import QuizGame from "./Components/QuizGame";
import Results from "./Components/Results";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizGame />}></Route>
        <Route path="/result" element={<Results />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

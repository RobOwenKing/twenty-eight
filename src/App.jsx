import { useState, useEffect, useRef } from "react";

import "./App.css";

import AnswersGrid from "./components/AnswersGrid.jsx";
import Calculator from "./components/Calculator.jsx";
import HowTo from "./components/HowTo.jsx";
import NewShare from "./components/NewShare.jsx";
import NewStats from "./components/NewStats.jsx";
import Share from "./components/Share.jsx";
import ViewToggle from "./components/ViewToggle.jsx";

import { getImpossibles } from "./helpers/getImpossibles.js";
import { getTodaysDigits } from "./helpers/getTodaysDigits.js";
import { parseStoredAnswers } from "./helpers/parseStoredAnswers.js";
import { storeAnswers } from "./helpers/storeAnswers.js";
import { storeNewHistory } from "./helpers/storeNewHistory.js";
import { storeHistory } from "./helpers/storeHistory.js";

/**
 * Show <HowTo> to new players, otherwise go straight to the <Calculator>
 * Only players who have made at least one number in <Calculator> before have localStorage.history
 */
const initialView = () => {
  return localStorage.getItem("history") ? "game" : "howto";
};

const App = () => {
  const date = useRef(new Date().toDateString());

  /**
   * IMPORTANT!
   * The date definition below can be used instead of that above for testing purposes
   * Before use, however, delete the localStorage related to the app at localhost:3000
   * Otherwise, you'll get infinite loops from fillScores(), etc
   */
  // const date = new Date("Thu Feb 17 2022").toDateString();

  const [answers, setAnswers] = useState([]);
  const [answerDetails, setAnswerDetails] = useState(new Array(28));

  const digits = getTodaysDigits(date.current);
  const [impossibles, possibles] = getImpossibles(digits);

  const [view, setView] = useState(initialView());

  /**
   * When the app loads, check for saved state from earlier the same day
   */
  useEffect(() => {
    const returned = parseStoredAnswers(date.current);
    if (!returned["answers"]) {
      return;
    } // eg: New player or first time playing that day

    setAnswers(returned["answers"]);
    setAnswerDetails(returned["answerDetails"]);
  }, []);

  /**
   * @param {number} inputVal - The equation's total to find the correct index in answerDetails
   * @returns {array.<number>}
   */
  const getNewAnswers = (inputVal) => {
    return [...answers, inputVal].sort((a, b) => a - b);
  };

  /**
   * @param {string} inputStr - The equation to be added to answerDetails
   * @param {number} inputVal - The equation's total to find the correct index in answerDetails
   * @returns {array.<string>}
   */
  const getNewAnswerDetails = (inputStr, inputVal) => {
    const newAnswerDetails = [...answerDetails];
    newAnswerDetails[inputVal - 1] = inputStr;

    return newAnswerDetails;
  };

  /**
   * Update game state and localStorage with new answer
   * @param {array.<string>} inputArr - The array of strings to join to form the current equation
   * @param {number} inputVal - The equation's total to find the correct index in answerDetails
   */
  const handleValidAnswer = (inputArr, inputVal) => {
    const newAnswers = getNewAnswers();
    const newAnswerDetails = getNewAnswerDetails(inputArr.join(""), inputVal);

    setAnswers(newAnswers);
    setAnswerDetails(newAnswerDetails);

    storeAnswers(date.current, newAnswers, newAnswerDetails);
    storeHistory(date.current, newAnswers.length); // Second param here is score
    storeNewHistory(
      date.current,
      newAnswers.length,
      newAnswers.length >= 28 - impossibles.length
    ); // Second param here is score
  };

  return (
    <div className="app">
      <h1>Twenty-Eight</h1>
      <h3>Your Daily Numbers Game</h3>
      <ViewToggle view={view} setView={setView} />
      {view === "howto" && <HowTo />}
      {view === "game" && (
        <div>
          {answers.length === possibles.length && (
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_jEMHbp.json"
              background="transparent"
              count="2"
              loop
              speed="1"
              style={{ width: "300px", height: "300px" }}
              autoplay
            ></lottie-player>
          )}
          <Calculator
            answers={answers}
            digits={digits}
            possibles={possibles}
            handleValidAnswer={handleValidAnswer}
          />
          <h3>
            Score: {answers.length}/{possibles.length}
          </h3>
          <AnswersGrid
            answerDetails={answerDetails}
            impossibles={impossibles}
          />
          {answers.length > 0 && (
            <NewShare answers={answers} possibles={possibles} />
          )}
        </div>
      )}
      {view === "stats" && (
        <>
          <NewStats answers={answers} />
          <Share answers={answers} answerDetails={answerDetails} />
        </>
      )}
      <footer className="footer">
        <p className="footer__p">A ReactJS app by Rob Owen King.</p>
        <p className="footer__p">
          Here's <a href="http://www.robowenking.com/">my website</a>; I'm also
          on <a href="https://github.com/RobOwenKing/">GitHub</a> and{" "}
          <a href="https://twitter.com/RobOwenKing">Twitter</a>.
        </p>
        <p className="footer__p">
          Animation by{" "}
          <a href="https://lottiefiles.com/user/61955">Emily Zhou</a>, used
          under the{" "}
          <a href="https://lottiefiles.com/page/license">
            Lottie Simple License
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default App;

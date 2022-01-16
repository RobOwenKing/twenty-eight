import { useState } from 'react';
import { evaluate } from 'mathjs';

import './App.css';

import InputButton from './components/InputButton.jsx';

import { useEventListener } from './hooks/useEventListener.js';

const App = () => {
  const inputs = ['1', '2', '3', '4', '+', '-', '*', '/', '(', ')'];

  const [currentInputStr, setCurrentInputStr] = useState('');
  const [currentInputVal, setCurrentInputVal] = useState(0);

  const [answers, setAnswers] = useState([]);

  const updateInputVal = (newInputStr) => {
    const whitelistedStr = newInputStr.replace(/[^0-9\(\)\+\-\*\/\.]/g, "");

    try {
      const newInputVal = evaluate(whitelistedStr);
      setCurrentInputVal(newInputVal);
    } catch(e) {
      return;
    }
  };

  const inputHandler = (input) => {
    const newInputStr = currentInputStr + input;
    setCurrentInputStr(newInputStr);
    updateInputVal(newInputStr);
  };

  const backspaceHandler = () => {
    const newInputStr = currentInputStr.slice(0, currentInputStr.length - 1);
    setCurrentInputStr(newInputStr);
    updateInputVal(newInputStr);
  };

  const isValidAnswer = () => {
    return Number.isInteger(currentInputVal) &&
        currentInputVal > 0 &&
        currentInputVal < 43 &&
        !answers.includes(currentInputVal);
  };

  const enterHandler = () => {
    if (isValidAnswer()) {
      setAnswers([...answers, currentInputVal]);
      setCurrentInputStr('');
      setCurrentInputVal(0);
    }
  };

  useEventListener('keydown', (e) => {
    e.preventDefault();
    if (inputs.includes(e.key)) { inputHandler(e.key); }
    if (e.key === 'Backspace') { backspaceHandler(); }
    if (e.key === 'Enter') { enterHandler(); }
    console.log(e.key);
  });

  return (
    <div className="App">
      <h1>Forty-Two</h1>
      <div className="grid">
        <div className="output span-four">
          <div className="output-calculation">{currentInputStr}</div>
          <div className="output-value">{currentInputVal}</div>
        </div>
        {
          inputs.map((input, id) => {
            return <InputButton key={id} input={input} clickHandler={inputHandler} />;
          })
        }
        <div className="button span-two" role="button" tabIndex="0" onClick={backspaceHandler}>Back</div>
        <div className="button span-four" role="button" tabIndex="0" onClick={enterHandler}>=</div>
      </div>
    </div>
  );
}

export default App;

const HowTo = () => {
  return (
    <div className="text-page">
      <h2>How To Play</h2>
      <p>
        This is a game about a strange calculator. A calculator with only four
        digits, which change every day.
      </p>
      <div className="how-to-grid grid has-one-row">
        <div className="grid__cell">6</div>
        <div className="grid__cell used">2</div>
        <div className="grid__cell">11</div>
        <div className="grid__cell">4</div>
      </div>
      <p>
        Each digit button must be used exactly once in every calculation. You
        can use the other symbols as many or as few times as you wish.
      </p>
      <div className="how-to-calc grid has-output-only">
        <div className="grid__cell is-span-four">
          <div className="calculator__equation">
            (4-2)*11+6<span className="caret"></span>
          </div>
          <div className="calculator__total is-valid">28</div>
        </div>
      </div>
      <p>
        Your challenge is to make as many of the numbers from 1 to 28 as you
        can.
      </p>
      <p>Press equals when you've found a new number to score points.</p>
      <div className="how-to-grid grid has-one-row">
        <div className="grid__cell is-span-four equals">=</div>
      </div>
    </div>
  );
};

export default HowTo;

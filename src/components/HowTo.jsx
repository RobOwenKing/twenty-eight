const HowTo = () => {
  return (
    <div className="text-page">
      <h2>How To Play</h2>
      <p>This is a game about a strange calculator. A calculator with only four digits, which change every day.</p>
      <div className="how-to-grid">
        <div>1</div>
        <div className="used">2</div>
        <div>3</div>
        <div>4</div>
      </div>
      <p>Each digit button must be used exactly once in every calculation. You can use the other symbols as many or as few times as you wish.</p>
      <p>Your challenge is to make as many of the numbers from 1 to 28 as you can.</p>
      <p>Press equals when you've found a new number to score points.</p>
      <div className="how-to-grid">
        <div className="span-four equals">=</div>
      </div>
    </div>
  );
}

export default HowTo;
/**
  * @param {array.<string|null>} answerDetails - Answers found by the user (equations, each with total index-1), else null. Expected length = 28
*/
const AnswersGrid = ({ answerDetails }) => {
  /**
    * If answers are too long, reduce the font size so they fit nicely into the layout
    * @todo Make this less magic-number-y
  */
  const fontSize = (answer) => {
    if (!answer) { return 'inherit'; }
    if (answer.length < 9) { return 'inherit'; }

    return (80 / answer.length) * 1.2;
  }

  return (
    <div className="answers-grid">
      {
        answerDetails.map((answer, id) => {
          return (
            <div
                key={id}
                className={answer ? "solved" : "not-solved"}
                style={{fontSize: fontSize(answer)}}
            >
              {answer ? answer : id+1}
            </div>
          )
        })
      }
    </div>
  );
}

export default AnswersGrid;
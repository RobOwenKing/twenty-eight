import BarChart from "./BarChart.jsx";

/**
 * @returns {array.<number>|null} User's scores over time in order from localStorage
 */
const getScores = () => {
  const history = localStorage.getItem("history");
  if (!history) {
    return null;
  }

  const parsedHistory = JSON.parse(history);
  return parsedHistory["scores"];
};

/**
 * @param {array.<number>} scores - User's scores
 * @returns {array.<number>} Number of scores in scores which fall into each of 5 bands
 */
const groupScores = (scores) => {
  return [
    scores.filter((e) => e >= 1 && e <= 14),
    scores.filter((e) => e >= 15 && e <= 21),
    scores.filter((e) => e >= 22 && e <= 25),
    scores.filter((e) => e === 26 || e === 27),
    scores.filter((e) => e === 28),
  ];
};

/**
 * @param {array.<number>} answers - Answers found by the user (values)
 */
const Stats = ({ answers }) => {
  const scores = getScores();
  const nonZeros = scores.filter((entry) => entry !== 0);
  const scoresByGroup = groupScores(nonZeros);

  /**
   * @returns {<number>} User's average score on days played (well, days score > 0)
   */
  const averageScore = () => {
    const total = nonZeros.reduce((subtotal, entry) => subtotal + entry);

    return total / nonZeros.length;
  };

  /**
   * @returns {array.<number>} User's last seven scores (representing last seven days)
   */
  const lastSevenScores = () => {
    if (scores.length >= 7) {
      return scores.slice(-7);
    }

    /**
     * If a user has played fewer than seven days, unshift 0s to the start of the array
     * to make sure our returned array is always of length 7
     */
    const copyOfScores = [...scores];
    while (copyOfScores.length < 7) {
      copyOfScores.unshift(0);
    }
    return copyOfScores;
  };

  /**
   * Note conditional return for when a user has scores = null, ie: never player
   */
  return (
    <div className="text-page">
      {scores && (
        <>
          <div className="stats-grid">
            <div className="stats-grid__number">
              {nonZeros.length /*Days played*/}
            </div>
            <div className="stats-grid__number">
              {answers.length /*Today's score*/}
            </div>
            <div className="stats-grid__number">
              {Math.max(...scores) /*Highscore*/}
            </div>
            <div className="stats-grid__number">
              {averageScore().toFixed(2) /*Average*/}
            </div>
            <div className="stats-grid__label">Days played</div>
            <div className="stats-grid__label">Today</div>
            <div className="stats-grid__label">Highest</div>
            <div className="stats-grid__label">Average</div>
          </div>
          <h3>Last seven days</h3>
          <BarChart
            divClass="bar-chart__of-seven"
            data={lastSevenScores()}
            highlights={[0, 0, 0, 0, 0, 0, 1]}
          />
          <h3>All time</h3>
          <BarChart
            divClass="bar-chart__of-five"
            data={scoresByGroup.map((s) => s.length)}
            highlights={scoresByGroup.map((s) =>
              s.includes(scores[scores.length - 1])
            )}
            labels={["1-14", "15-21", "22-25", "26-27", "28"]}
          />
        </>
      )}
      {!scores && <p>Come back here after you've tried playing the game!</p>}
    </div>
  );
};

export default Stats;

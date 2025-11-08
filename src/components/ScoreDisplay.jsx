import PropTypes from 'prop-types';

function ScoreDisplay({ score, highScore, streak, bestStreak, streakMilestone }) {
  return (
    <>
      <div className="score-container slide-down">
        <div className="score">Score: {score}</div>
        <div className="high-score">High Score: {highScore}</div>
        <div className="streak">
          🔥 Streak: {streak}
          {bestStreak > 0 && (
            <span className="best-streak"> (Best: {bestStreak})</span>
          )}
        </div>
      </div>
      
      {streakMilestone && (
        <div className="streak-milestone pop-in">
          🔥 {streakMilestone} Streak Milestone! 🔥
        </div>
      )}
    </>
  );
}

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  streak: PropTypes.number.isRequired,
  bestStreak: PropTypes.number.isRequired,
  streakMilestone: PropTypes.number,
};

export default ScoreDisplay;
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function ScoreDisplay({ score, highScore, streak, bestStreak, streakMilestone, onClearStreakMilestone }) {
  useEffect(() => {
    if (streakMilestone && onClearStreakMilestone) {
      const timeout = setTimeout(() => {
        onClearStreakMilestone();
      }, 2000); // Hide after 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [streakMilestone, onClearStreakMilestone]);

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
  onClearStreakMilestone: PropTypes.func,
};

export default ScoreDisplay;
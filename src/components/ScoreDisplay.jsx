import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

function ScoreDisplay({
  score,
  highScore,
  streak,
  bestStreak,
  streakMilestone,
  onClearStreakMilestone,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    if (streakMilestone && onClearStreakMilestone) {
      const timeout = setTimeout(
        () => {
          onClearStreakMilestone();
        },

        2000
      ); // Hide after 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [streakMilestone, onClearStreakMilestone]);

  return (
    <>
      {' '}
      <div className='score-container slide-down'>
        {' '}
        <div className='score'>
          {' '}
          {t('score')}: {score}
        </div>{' '}
        <div className='high-score'>
          {' '}
          {t('highScore')}: {highScore}
        </div>{' '}
        <div className='language-switch'>
          {' '}
          <LanguageSelector />{' '}
        </div>{' '}
        <div className='streak'>
          {' '}
          🔥 {t('streak')}: {streak}
          {bestStreak > 0 && (
            <span className='best-streak'>
              {' '}
              ( {t('best')}: {bestStreak})
            </span>
          )}
        </div>{' '}
      </div>{' '}
      {streakMilestone && (
        <div className='streak-milestone pop-in'>
          {' '}
          🔥 {t('streak')}
          {streakMilestone}
          {t('streakMilestone')}
          🔥{' '}
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

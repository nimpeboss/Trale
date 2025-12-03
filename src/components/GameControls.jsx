import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function GameControls({
  onGuess,
  onToggleDarkMode,
  showResult,
  isMobile,
  darkMode,
  rightPokemon,
  leftPokemon,
  currentStat,
}) {
  const { t } = useTranslation();

  return (
    <>
      {/* Game Action Buttons */}
      <div className='buttons'>
        <button
          onClick={() => onGuess('higher')}
          className={`guess-button higher ${isMobile ? 'mobile-button' : ''}`}
          disabled={showResult}
          aria-label={t('ariaGuessHigher', {
            name: rightPokemon.name,
            stat: currentStat.label.toLowerCase(),
            value: leftPokemon[currentStat.key],
          })}
          aria-describedby='current-stat-label'
        >
          <span className='button-icon' aria-hidden='true'>
            ↑
          </span>
          {t('higher')}
          {isMobile && (
            <span className='mobile-hint' aria-hidden='true'>
              {t('mobileSwipeUp')}
            </span>
          )}
        </button>

        <button
          onClick={() => onGuess('lower')}
          className={`guess-button lower ${isMobile ? 'mobile-button' : ''}`}
          disabled={showResult}
          aria-label={t('ariaGuessLower', {
            name: rightPokemon.name,
            stat: currentStat.label.toLowerCase(),
            value: leftPokemon[currentStat.key],
          })}
          aria-describedby='current-stat-label'
        >
          <span className='button-icon' aria-hidden='true'>
            ↓
          </span>
          {t('lower')}
          {isMobile && (
            <span className='mobile-hint' aria-hidden='true'>
              {t('mobileSwipeDown')}
            </span>
          )}
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={onToggleDarkMode}
        className='dark-mode-toggle'
        aria-label={darkMode ? t('switchToLightMode') : t('switchToDarkMode')}
        title={darkMode ? t('switchToLightMode') : t('switchToDarkMode')}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </>
  );
}

GameControls.propTypes = {
  onGuess: PropTypes.func.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  rightPokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  leftPokemon: PropTypes.object.isRequired,
  currentStat: PropTypes.shape({
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameControls;

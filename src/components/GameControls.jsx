import PropTypes from 'prop-types';

function GameControls({ 
  onGuess, 
  onToggleDarkMode, 
  showResult, 
  isMobile, 
  darkMode, 
  rightPokemon, 
  leftPokemon, 
  currentStat 
}) {
  return (
    <>
      {/* Game Action Buttons */}
      <div className="buttons">
        <button 
          onClick={() => onGuess('higher')}
          className={`guess-button higher ${isMobile ? 'mobile-button' : ''}`}
          disabled={showResult}
          aria-label={`Guess that ${rightPokemon.name}'s ${currentStat.label.toLowerCase()} is higher than ${leftPokemon[currentStat.key]}`}
          aria-describedby="current-stat-label"
        >
          <span className="button-icon" aria-hidden="true">↑</span>
          HIGHER
          {isMobile && <span className="mobile-hint" aria-hidden="true">(Swipe ↑)</span>}
        </button>
        
        <button 
          onClick={() => onGuess('lower')}
          className={`guess-button lower ${isMobile ? 'mobile-button' : ''}`}
          disabled={showResult}
          aria-label={`Guess that ${rightPokemon.name}'s ${currentStat.label.toLowerCase()} is lower than ${leftPokemon[currentStat.key]}`}
          aria-describedby="current-stat-label"
        >
          <span className="button-icon" aria-hidden="true">↓</span>
          LOWER
          {isMobile && <span className="mobile-hint" aria-hidden="true">(Swipe ↓)</span>}
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <button 
        onClick={onToggleDarkMode}
        className="dark-mode-toggle"
        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
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
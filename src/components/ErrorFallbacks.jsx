import PropTypes from 'prop-types';

// Fallback for Pokemon card loading errors
export function PokemonCardError({ onRetry, pokemonName }) {
  return (
    <div className="pokemon-card error-card">
      <div className="error-icon">🚫</div>
      <h3>Failed to load Pokemon</h3>
      <p>{pokemonName ? `Error loading ${pokemonName}` : 'Pokemon data unavailable'}</p>
      <button onClick={onRetry} className="retry-button">
        🔄 Retry
      </button>
    </div>
  );
}

// Fallback for network/API errors
export function NetworkError({ onRetry }) {
  return (
    <div className="network-error">
      <div className="error-icon">🌐</div>
      <h3>Connection Problem</h3>
      <p>Unable to connect to Pokemon API. Please check your internet connection.</p>
      <button onClick={onRetry} className="retry-button">
        🔄 Try Again
      </button>
    </div>
  );
}

// Fallback for game state errors
export function GameStateError({ onRestart }) {
  return (
    <div className="game-error">
      <div className="error-icon">🎮</div>
      <h3>Game Error</h3>
      <p>Something went wrong with the game state. Let's start fresh!</p>
      <button onClick={onRestart} className="restart-button">
        🔄 Restart Game
      </button>
    </div>
  );
}

// Fallback for image loading errors
export function ImageError({ alt, onRetry }) {
  return (
    <div className="image-error">
      <div className="error-icon">🖼️</div>
      <p>Image failed to load</p>
      {alt && <small>{alt}</small>}
      {onRetry && (
        <button onClick={onRetry} className="retry-button small">
          🔄 Retry
        </button>
      )}
    </div>
  );
}

// Generic error fallback
export function GenericError({ message, onRetry }) {
  return (
    <div className="generic-error">
      <div className="error-icon">⚠️</div>
      <h3>Something went wrong</h3>
      <p>{message || 'An unexpected error occurred'}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          🔄 Try Again
        </button>
      )}
    </div>
  );
}

// PropTypes for all components
PokemonCardError.propTypes = {
  onRetry: PropTypes.func.isRequired,
  pokemonName: PropTypes.string,
};

NetworkError.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

GameStateError.propTypes = {
  onRestart: PropTypes.func.isRequired,
};

ImageError.propTypes = {
  alt: PropTypes.string,
  onRetry: PropTypes.func,
};

GenericError.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
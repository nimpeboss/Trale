import PropTypes from 'prop-types';
import AnimatedNumber from './AnimatedNumber';
import TypeBadges from './TypeBadges';
import './PokemonCard.css';

function PokemonCard({ 
  pokemon, 
  currentStat, 
  position = 'left', 
  animateCards = false, 
  showResult = false, 
  isCorrect = null,
  className = '',
  style = {},
}) {
  const getCardClasses = () => {
    let classes = ['pokemon-card'];
    if (animateCards) classes.push('animate-in');
    if (showResult && isCorrect === true) classes.push('correct');
    if (showResult && isCorrect === false) classes.push('incorrect');
    if (className) classes.push(className);
    return classes.join(' ');
  };

  const handleImageError = (e) => {
    console.log(`${position} Pokemon image failed to load:`, pokemon.sprite);
    e.target.style.display = 'block';
    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="%23666">No Image</text></svg>';
  };

  const handleImageLoad = () => {};

  // Card sizing is now handled by CSS for responsiveness
  const cardStyle = { ...style };
  const imgSize = 240;

  return (
    <div 
      className={getCardClasses()}
      aria-label={
        position === 'left' 
          ? `${pokemon.name} - type Pokemon with ${currentStat.label} of ${pokemon[currentStat.key]}`
          : undefined
      }
      style={cardStyle}
      tabIndex={0}
      role="region"
      aria-labelledby={position === "left" ? "left-pokemon" : undefined}
    >
      <img 
        src={pokemon.sprite || '/placeholder-pokemon.png'}
        alt={position === 'left' ? "" : pokemon.name}
        width={imgSize}
        height={imgSize}
        loading={position === 'left' ? "eager" : "lazy"}
        className="pokemon-image"
        role={position === 'left' ? "presentation" : undefined}
        onError={handleImageError}
        onLoad={handleImageLoad}
        tabIndex={-1}
      />
      <h2 
        className="pokemon-name"
        id={position === 'left' ? "left-pokemon" : undefined}
      >
        {pokemon.name}
      </h2>
      <TypeBadges types={pokemon.types} showAriaLabel={position === 'left'} />
      <div className="stat-display">
        <p 
          className="stat-label"
          id={position === 'left' ? "current-stat-label" : undefined}
        >
          {currentStat.label}
        </p>
        {position === 'left' ? (
          <p className="stat-value" aria-describedby="current-stat-label">
            <AnimatedNumber value={pokemon[currentStat.key]} />
          </p>
        ) : (
          <>
            {showResult ? (
              <p className="stat-value revealed pop-in">
                <AnimatedNumber value={pokemon[currentStat.key]} />
              </p>
            ) : (
              <p className="stat-value hidden pulse-slow" aria-label='Hidden stat value'>???</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprite: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  currentStat: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.oneOf(['left', 'right']),
  animateCards: PropTypes.bool,
  showResult: PropTypes.bool,
  isCorrect: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default PokemonCard;
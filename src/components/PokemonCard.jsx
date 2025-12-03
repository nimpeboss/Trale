import PropTypes from 'prop-types';
import AnimatedNumber from './AnimatedNumber';
import { useTranslation } from 'react-i18next';
import TypeBadges from './TypeBadges';

function PokemonCard({
  pokemon,
  currentStat,
  position = 'left',
  animateCards = false,
  showResult = false,
  isCorrect = null,
  className = '',
}) {
  const getCardClasses = () => {
    const classes = [`pokemon-card`, position];

    if (animateCards) {
      classes.push(position === 'left' ? 'slide-in-left' : 'slide-in-right');
    }
    // Modal/info button removed; details are no longer shown in a dialog
    if (showResult) {
      if (position === 'left' && isCorrect === false) {
        classes.push('shake');
      }
      if (position === 'right') {
        classes.push(isCorrect ? 'glow-success' : 'glow-fail');
      }
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };
  const { t } = useTranslation();

  const handleImageError = e => {
    console.log(`${position} Pokemon image failed to load:`, pokemon.sprite);
    e.target.style.display = 'block';
    e.target.src =
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="%23666">No Image</text></svg>';
  };

  const handleImageLoad = () => {
    console.log(`${position} Pokemon image loaded:`, pokemon.name);
  };

  return (
    <div
      className={getCardClasses()}
      aria-label={
        position === 'left'
          ? `${pokemon.name} - type Pokemon with ${currentStat.label} of ${pokemon[currentStat.key]}`
          : undefined
      }
    >
      <img
        src={pokemon.sprite || '/placeholder-pokemon.png'}
        alt={position === 'left' ? '' : pokemon.name}
        loading={position === 'left' ? 'eager' : 'lazy'}
        className='pokemon-image'
        role={position === 'left' ? 'presentation' : undefined}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />

      <h2 className='pokemon-name' id={position === 'left' ? 'left-pokemon' : undefined}>
        <a
          href={`https://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(pokemon.name.replaceAll(/\s+/g, '_') + '_(Pokémon)')}`}
          target='_blank'
          rel='noopener noreferrer'
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
          aria-label={t('openBulbapedia', { name: pokemon.name })}
        >
          {pokemon.name}
          <span className='external-link-icon' aria-hidden='true'>
            ↗
          </span>
        </a>
        {/* Details button removed — modal was removed */}
      </h2>

      <TypeBadges types={pokemon.types} showAriaLabel={position === 'left'} />

      <div className='stat-display'>
        <p className='stat-label' id={position === 'left' ? 'current-stat-label' : undefined}>
          {currentStat.label}
        </p>

        {position === 'left' ? (
          <p className='stat-value' aria-describedby='current-stat-label'>
            <AnimatedNumber value={pokemon[currentStat.key]} />
          </p>
        ) : (
          <>
            {showResult ? (
              <p className='stat-value revealed pop-in'>
                <AnimatedNumber value={pokemon[currentStat.key]} />
              </p>
            ) : (
              <p className='stat-value hidden pulse-slow'>{t('hiddenStat')}</p>
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
  // onRequestDetails removed with modal
};

export default PokemonCard;

import PropTypes from 'prop-types';

function TypeBadges({ types, showAriaLabel = true }) {
  return (
    <div 
      className="type-badges" 
      aria-label={showAriaLabel ? `Types: ${types.join(', ')}` : undefined}
    >
      {types.map((type) => (
        <span 
          key={type} 
          className={`type-badge type-${type}`}
          aria-hidden="true"
        >
          {type}
        </span>
      ))}
    </div>
  );
}

TypeBadges.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  showAriaLabel: PropTypes.bool,
};

export default TypeBadges;
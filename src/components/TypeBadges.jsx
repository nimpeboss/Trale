import PropTypes from 'prop-types';

function TypeBadges({ types, showAriaLabel = false }) {
  return (
    <div className="type-badges" style={{ display: 'flex', gap: 6 }}>
      {types.map((type) => (
        <span 
          key={type} 
          className={`pokemon-type type-${type}`}
          tabIndex={0}
          aria-label={showAriaLabel ? `Type: ${type}` : undefined}
          style={{
            marginRight: 0,
            padding: "0.2em 0.7em",
            borderRadius: "1em",
            background: "#222",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.95em",
            outline: "none",
          }}
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
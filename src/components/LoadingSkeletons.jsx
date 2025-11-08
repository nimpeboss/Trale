import PropTypes from 'prop-types';

// Base skeleton component with shimmer animation
function SkeletonBase({ className = '', style = {}, children, ...props }) {
  return (
    <div 
      className={`skeleton ${className}`}
      style={style}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}

// Skeleton for Pokemon card image
function SkeletonImage({ width = 200, height = 200, className = '' }) {
  return (
    <SkeletonBase 
      className={`skeleton-image ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}

// Skeleton for text lines
function SkeletonText({ 
  width = '100%', 
  height = '1.2em', 
  className = '',
  lines = 1 
}) {
  if (lines === 1) {
    return (
      <SkeletonBase 
        className={`skeleton-text ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <div className="skeleton-text-multiline">
      {Array.from({ length: lines }, (_, i) => (
        <SkeletonBase
          key={i}
          className={`skeleton-text ${className}`}
          style={{ 
            width: i === lines - 1 ? '70%' : width, 
            height,
            marginBottom: i < lines - 1 ? '0.5em' : 0
          }}
        />
      ))}
    </div>
  );
}

// Skeleton for circular elements (like badges)
function SkeletonCircle({ size = 24, className = '' }) {
  return (
    <SkeletonBase 
      className={`skeleton-circle ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        borderRadius: '50%'
      }}
    />
  );
}

// Skeleton for rectangular badges
function SkeletonBadge({ width = 60, height = 24, className = '' }) {
  return (
    <SkeletonBase 
      className={`skeleton-badge ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        borderRadius: '12px'
      }}
    />
  );
}

// Complete Pokemon Card skeleton
function PokemonCardSkeleton({ position = 'left', className = '' }) {
  const cardClasses = `pokemon-card skeleton-card ${position} ${className}`;

  return (
    <div className={cardClasses}>
      {/* Pokemon Image Skeleton */}
      <SkeletonImage className="pokemon-image-skeleton" />
      
      {/* Pokemon Name Skeleton */}
      <SkeletonText 
        width="80%" 
        height="1.5em" 
        className="pokemon-name-skeleton"
      />
      
      {/* Type Badges Skeleton */}
      <div className="type-badges-skeleton">
        <SkeletonBadge width={70} height={28} />
        <SkeletonBadge width={60} height={28} />
      </div>
      
      {/* Stat Display Skeleton */}
      <div className="stat-display-skeleton">
        <SkeletonText 
          width="60%" 
          height="1em" 
          className="stat-label-skeleton"
        />
        
        {position === 'left' ? (
          <SkeletonText 
            width="40%" 
            height="2em" 
            className="stat-value-skeleton"
          />
        ) : (
          <SkeletonText 
            width="30%" 
            height="2em" 
            className="stat-value-skeleton hidden-stat"
          />
        )}
      </div>
    </div>
  );
}

// Score Display skeleton
function ScoreDisplaySkeleton({ className = '' }) {
  return (
    <div className={`score-display skeleton-score ${className}`}>
      <div className="score-item-skeleton">
        <SkeletonText width="50px" height="1em" className="score-label-skeleton" />
        <SkeletonText width="30px" height="1.5em" className="score-value-skeleton" />
      </div>
      <div className="score-item-skeleton">
        <SkeletonText width="60px" height="1em" className="score-label-skeleton" />
        <SkeletonText width="30px" height="1.5em" className="score-value-skeleton" />
      </div>
      <div className="score-item-skeleton">
        <SkeletonText width="40px" height="1em" className="score-label-skeleton" />
        <SkeletonText width="25px" height="1.5em" className="score-value-skeleton" />
      </div>
    </div>
  );
}

// Game Controls skeleton
function GameControlsSkeleton({ className = '' }) {
  return (
    <div className={`game-controls skeleton-controls ${className}`}>
      <SkeletonBase 
        className="skeleton-button higher-button"
        style={{ width: '120px', height: '50px', borderRadius: '25px' }}
      />
      <SkeletonBase 
        className="skeleton-button lower-button"
        style={{ width: '120px', height: '50px', borderRadius: '25px' }}
      />
      <SkeletonBase 
        className="skeleton-button dark-mode-button"
        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
      />
    </div>
  );
}

// PropTypes
SkeletonBase.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

SkeletonImage.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

SkeletonText.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  lines: PropTypes.number,
};

SkeletonCircle.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

SkeletonBadge.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

PokemonCardSkeleton.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

ScoreDisplaySkeleton.propTypes = {
  className: PropTypes.string,
};

GameControlsSkeleton.propTypes = {
  className: PropTypes.string,
};

export {
  SkeletonBase,
  SkeletonImage,
  SkeletonText,
  SkeletonCircle,
  SkeletonBadge,
  PokemonCardSkeleton,
  ScoreDisplaySkeleton,
  GameControlsSkeleton,
};

export default PokemonCardSkeleton;
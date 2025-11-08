import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function AnimatedNumber({ value, duration = 1000 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startValue = 0;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (value - startValue) * easeOutQuart);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
}

AnimatedNumber.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
};

export default AnimatedNumber;
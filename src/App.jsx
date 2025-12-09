import { useState, useEffect, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import './App.css';
import PokemonCard from './components/PokemonCard';
import GameControls from './components/GameControls';
import ScoreDisplay from './components/ScoreDisplay';

function App() {
  const { t } = useTranslation();
  const [leftPokemon, setLeftPokemon] = useState(null);
  const [rightPokemon, setRightPokemon] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [currentStat, setCurrentStat] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [preloadedPokemon, setPreloadedPokemon] = useState(null);
  const [streakMilestone, setStreakMilestone] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchFeedback, setTouchFeedback] = useState(null);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');
  const [animateCards, setAnimateCards] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('pokemonDarkMode', newDarkMode.toString());

    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Load high score from localStorage on mount and detect mobile
  useEffect(() => {
    const savedHighScore = localStorage.getItem('pokemonHighScore');

    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10));
    }

    const savedBestStreak = localStorage.getItem('pokemonBestStreak');

    if (savedBestStreak) {
      setBestStreak(Number.parseInt(savedBestStreak, 10));
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('pokemonDarkMode');

    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Mobile detection
    const checkMobile = () => {
      setIsMobile(globalThis.matchMedia('(max-width: 900px)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update high score when score changes
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('pokemonHighScore', score.toString());
    }
  }, [score, highScore]);

  // Update best streak when streak changes
  useEffect(() => {
    if (streak > bestStreak) {
      setBestStreak(streak);
      localStorage.setItem('pokemonBestStreak', streak.toString());
    }
  }, [streak, bestStreak]);

  const stats = useMemo(
    () => [
      {
        key: 'height',
        label: 'Height',
      },
      {
        key: 'weight',
        label: 'Weight',
      },
      {
        key: 'hp',
        label: 'HP',
      },
      {
        key: 'attack',
        label: 'Attack',
      },
      {
        key: 'defense',
        label: 'Defense',
      },
      {
        key: 'speed',
        label: 'Speed',
      },
    ],
    []
  );

  const getRandomStat = useCallback(() => stats[Math.floor(Math.random() * stats.length)], [stats]);
  const getRandomPokemonId = () => Math.floor(Math.random() * 1025) + 1; // Gen 1-9

  const sanitizeUrl = url => {
    if (!url || typeof url !== 'string') return null;

    try {
      const parsedUrl = new URL(url);

      // Only allow URLs from PokeAPI's official domains
      if (
        parsedUrl.hostname === 'raw.githubusercontent.com' ||
        parsedUrl.hostname.endsWith('.pokeapi.co')
      ) {
        return url;
      }
    } catch {
      // Invalid URL
    }

    return null;
  };

  const fetchPokemon = useCallback(async id => {
    console.log('Fetching Pokemon with ID:', id);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        cache: 'force-cache',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const totalStats = data.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
      const sprite = sanitizeUrl(
        data.sprites.other['official-artwork'].front_default || data.sprites.front_default
      );

      // Preload image
      if (sprite) {
        const img = new Image();
        img.src = sprite;
      }

      const pokemon = {
        id: data.id,
        name: data.name,
        sprite,
        types: data.types.map(t => t.type.name),
        totalStats,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        base_experience: data.base_experience,
      };

      console.log('Successfully fetched:', pokemon.name);
      return pokemon;
    } catch (error) {
      console.error(`Error fetching Pokemon ${id}:`, error);
      throw error;
    }
  }, []);

  // Preload helper - ensure defined before `loadNewPokemon` to avoid reference-before-init
  const preloadNextPokemon = useCallback(async () => {
    try {
      const nextPokemon = await fetchPokemon(getRandomPokemonId());
      setPreloadedPokemon(nextPokemon);
    } catch {
      setPreloadedPokemon(null);
    }
  }, [fetchPokemon]);

  const loadNewPokemon = useCallback(async () => {
    console.log('Loading new Pokemon...');
    setLoading(true);
    setShowResult(false);
    setIsCorrect(null);
    setAnimateCards(false);

    try {
      let left = await fetchPokemon(getRandomPokemonId());
      let right = await fetchPokemon(getRandomPokemonId());
      let stat = getRandomStat();

      console.log('Fetched Pokemon:', left.name, 'vs', right.name);

      // Ensure different Pokemon
      while (left.id === right.id) {
        right = await fetchPokemon(getRandomPokemonId());
      }

      // Ensure the chosen stat has different values
      let attempts = 0;

      while (left[stat.key] === right[stat.key] && attempts < 20) {
        // Try a different stat first
        stat = getRandomStat();
        attempts++;

        // If tried all stats and still equal, get a new right Pokemon
        if (attempts % 7 === 0) {
          right = await fetchPokemon(getRandomPokemonId());

          while (left.id === right.id) {
            right = await fetchPokemon(getRandomPokemonId());
          }

          stat = getRandomStat();
        }
      }

      setLeftPokemon(left);
      setRightPokemon(right);
      setCurrentStat(stat);
      setLoading(false);

      console.log('Pokemon loaded successfully');

      // Trigger entrance animation and preload next Pokemon
      setTimeout(() => setAnimateCards(true), 100);
      preloadNextPokemon();
    } catch (error) {
      console.error('Error loading Pokemon:', error);
      setLoading(false);
      // You could set an error state here to show an error message
    }
  }, [fetchPokemon, getRandomStat, preloadNextPokemon]);

  // preloadNextPokemon defined earlier

  const loadNextRound = async () => {
    setLeftPokemon(rightPokemon);

    // Use preloaded Pokemon if available, otherwise fetch new one
    let newPokemon = preloadedPokemon;

    if (!newPokemon || newPokemon.id === rightPokemon.id) {
      newPokemon = await fetchPokemon(getRandomPokemonId());

      // Ensure different from current
      while (newPokemon.id === rightPokemon.id) {
        newPokemon = await fetchPokemon(getRandomPokemonId());
      }
    }

    let newStat = getRandomStat();
    // Ensure stat has different values
    let attempts = 0;

    while (rightPokemon[newStat.key] === newPokemon[newStat.key] && attempts < 20) {
      newStat = getRandomStat();
      attempts++;

      if (attempts % 7 === 0) {
        newPokemon = await fetchPokemon(getRandomPokemonId());

        while (newPokemon.id === rightPokemon.id) {
          newPokemon = await fetchPokemon(getRandomPokemonId());
        }

        newStat = getRandomStat();
      }
    }

    setRightPokemon(newPokemon);
    setCurrentStat(newStat);
    setShowResult(false);
    setIsCorrect(null);
    setTimeout(() => setAnimateCards(true), 100);

    // Preload next Pokemon in background
    preloadNextPokemon();
  };

  const handleCorrectGuess = () => {
    setScore(score + 1);
    setStreak(streak + 1);

    setTimeout(
      () => {
        setAnimateCards(false);

        setTimeout(
          () => {
            loadNextRound();
          },

          300
        );
      },

      1500
    );
  };

  const handleIncorrectGuess = () => {
    setStreak(0);

    setTimeout(
      () => {
        setGameOver(true);
      },

      1500
    );
  };

  const handleGuess = guess => {
    if (showResult) return;

    setShowResult(true);

    const leftValue = leftPokemon[currentStat.key];
    const rightValue = rightPokemon[currentStat.key];

    const correct =
      (guess === 'higher' && rightValue >= leftValue) ||
      (guess === 'lower' && rightValue <= leftValue);

    setIsCorrect(correct);

    // Accessibility announcement
    const announcement = correct
      ? t('announceCorrect', {
          name: rightPokemon.name,
          value: rightValue,
          stat: currentStat.label.toLowerCase(),
          comparison: guess,
          leftName: leftPokemon.name,
          leftValue: leftValue,
          score: score + 1,
        })
      : t('announceWrong', {
          name: rightPokemon.name,
          value: rightValue,
          stat: currentStat.label.toLowerCase(),
          comparison: guess,
          leftName: leftPokemon.name,
          leftValue: leftValue,
        });
    setScreenReaderAnnouncement(announcement);

    // Touch feedback for mobile
    if (isMobile) {
      setTouchFeedback(correct ? 'success' : 'error');
      setTimeout(() => setTouchFeedback(null), 300);

      // Haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(correct ? [50] : [100, 50, 100]);
      }
    }

    if (correct) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess();
    }
  };

  // Touch/swipe handlers for mobile
  const handleTouchStart = e => {
    if (!isMobile || showResult) return;
    const touch = e.touches[0];

    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  const handleTouchEnd = e => {
    if (!isMobile || showResult || !touchStart) return;

    const touch = e.changedTouches[0];
    const deltaY = touchStart.y - touch.clientY;
    const deltaX = Math.abs(touchStart.x - touch.clientX);

    // Only trigger if it's more vertical than horizontal and significant distance
    if (Math.abs(deltaY) > deltaX && Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        handleGuess('higher');
      } else {
        handleGuess('lower');
      }
    }

    setTouchStart(null);
  };

  const restartGame = () => {
    setScore(0);

    setStreak(0);
    setGameOver(false);
    setShowResult(false);
    setIsCorrect(null);
    loadNewPokemon();
  };

  const resetHighScore = () => {
    localStorage.removeItem('pokemonBestStreak');
    localStorage.removeItem('pokemonHighScore');
    setHighScore(0);
    setBestStreak(0);
    // Rick Roll easter egg
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  // Modal handlers removed

  useEffect(() => {
    loadNewPokemon();
  }, [loadNewPokemon]);

  if (loading) {
    return (
      <div className='loading'>
        {' '}
        <div className='pokeball-loader'></div> <p>Loading Pokémon...</p>{' '}
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className='game-over fade-in'>
        {' '}
        <h1 className='game-over-title'> {t('gameOver')}!</h1>{' '}
        <p className='final-score pulse'>
          {' '}
          {t('finalScore')}: {score}
        </p>{' '}
        {score === highScore && score > 0 && (
          <p className='new-high-score pop-in'> {t('newHighScore')}</p>
        )}
        <p className='high-score-display'>
          {' '}
          {t('highScore')}: {highScore}
        </p>{' '}
        {streak === bestStreak && streak > 0 && (
          <p className='new-high-score pop-in'> {t('newBestStreak')}</p>
        )}
        <p className='high-score-display'>
          {' '}
          {t('best')}
          {t('streak')}: {bestStreak}
        </p>{' '}
        <button type='button' onClick={restartGame} className='restart-button bounce'>
          {' '}
          {t('restart')}
        </button>{' '}
        <button type='button' onClick={resetHighScore} className='reset-high-score-button'>
          {' '}
          {t('resetHighScore')}
        </button>{' '}
      </div>
    );
  }

  return (
    <>
      {' '}
      <main
        className='game-container'
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label={t('appAriaLabel')}
      >
        {' '}
        {/* Screen reader announcements */}
        <div aria-live='polite' aria-atomic='true' className='sr-only'>
          {' '}
          {screenReaderAnnouncement}
        </div>{' '}
        {/* Touch feedback overlay */}
        {touchFeedback && (
          <div
            className={`touch-feedback $ {
          touchFeedback
        }

        `}
            aria-hidden='true'
          >
            {' '}
            {touchFeedback === 'success' ? '✓' : '✗'}
          </div>
        )}
        {/* Mobile swipe instructions */}
        {isMobile && !showResult && leftPokemon && rightPokemon && (
          <div className='mobile-instructions' aria-hidden='true'>
            {' '}
            <span> {t('swipeHint')}</span>{' '}
          </div>
        )}
        <ScoreDisplay
          score={score}
          highScore={highScore}
          streak={streak}
          bestStreak={bestStreak}
          streakMilestone={streakMilestone}
          onClearStreakMilestone={() => setStreakMilestone(null)}
        />{' '}
        <div className='pokemon-cards'>
          {' '}
          <PokemonCard
            pokemon={leftPokemon}
            currentStat={currentStat}
            position='left'
            animateCards={animateCards}
            showResult={showResult}
            isCorrect={isCorrect}
          />{' '}
          <div className='vs-section'>
            {' '}
            <div className='vs-text pulse-slow'> {t('vs')}</div>{' '}
            {showResult && (
              <div
                className={['result-indicator', isCorrect ? 'correct' : 'incorrect', 'pop-in'].join(
                  ' '
                )}
              >
                {isCorrect ? t('correct') : t('wrong')}
              </div>
            )}
            <GameControls
              onGuess={handleGuess}
              onToggleDarkMode={toggleDarkMode}
              showResult={showResult}
              isMobile={isMobile}
              darkMode={darkMode}
              rightPokemon={rightPokemon}
              leftPokemon={leftPokemon}
              currentStat={currentStat}
            />{' '}
          </div>{' '}
          <PokemonCard
            pokemon={rightPokemon}
            currentStat={currentStat}
            position='right'
            animateCards={animateCards}
            showResult={showResult}
            isCorrect={isCorrect}
          />{' '}
        </div>{' '}
      </main>{' '}
    </>
  );
}

export default App;

<<<<<<< HEAD
import { useState, useEffect, useMemo } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import GameControls from './components/GameControls';
import ScoreDisplay from './components/ScoreDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import { NetworkError, GameStateError } from './components/ErrorFallbacks';
import { 
  PokemonCardSkeleton, 
  ScoreDisplaySkeleton, 
  GameControlsSkeleton 
} from './components/LoadingSkeletons';
import OfflineStorage from './utils/offlineStorage';

function App() {
  const [leftPokemon,
  setLeftPokemon]=useState(null);
  const [rightPokemon,
  setRightPokemon]=useState(null);
  const [score,
  setScore]=useState(0);
  const [highScore,
  setHighScore]=useState(0);
  const [streak,
  setStreak]=useState(0);
  const [bestStreak,
  setBestStreak]=useState(0);
  const [gameOver,
  setGameOver]=useState(false);
  const [loading,
  setLoading]=useState(true);
  const [showResult,
  setShowResult]=useState(false);
  const [currentStat,
  setCurrentStat]=useState(null);
  const [isCorrect,
  setIsCorrect]=useState(null);
  const [preloadedPokemon,
  setPreloadedPokemon]=useState(null);
  const [streakMilestone,
  setStreakMilestone]=useState(null);
  const [darkMode,
  setDarkMode]=useState(false);
  const [isMobile,
  setIsMobile]=useState(false);
  const [touchFeedback,
  setTouchFeedback]=useState(null);
  const [screenReaderAnnouncement,
  setScreenReaderAnnouncement]=useState("");
  const [animateCards,
  setAnimateCards]=useState(false);
  
  // Initialize offline storage
  const offlineStorage = useMemo(() => new OfflineStorage(), []);
=======
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./App.css";

function AnimatedNumber({ value, duration = 1000 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startValue = 0;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(
        startValue + (value - startValue) * easeOutQuart
      );

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span> {displayValue}</span>;
}

AnimatedNumber.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number,
};

function App() {
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
  const [animateCards, setAnimateCards] = useState(false);
  const [preloadedPokemon, setPreloadedPokemon] = useState(null);
  const [streakMilestone, setStreakMilestone] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
>>>>>>> parent of 272d113 (backup)

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("pokemonDarkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
<<<<<<< HEAD
  }

  ;

  // Load high score from localStorage on mount and detect mobile
  useEffect(()=> {
      const savedHighScore=localStorage.getItem("pokemonHighScore");

      if (savedHighScore) {
        setHighScore(Number.parseInt(savedHighScore, 10));
      }

      const savedBestStreak=localStorage.getItem("pokemonBestStreak");

      if (savedBestStreak) {
        setBestStreak(Number.parseInt(savedBestStreak, 10));
      }

      // Load dark mode preference
      const savedDarkMode=localStorage.getItem("pokemonDarkMode");

      if (savedDarkMode==="true") {
        setDarkMode(true);
        document.body.classList.add("dark-mode");
      }

      // Mobile detection
      const checkMobile=()=> {
        setIsMobile(globalThis.innerWidth <= 768 || 'ontouchstart' in globalThis);
      }

      ;

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => globalThis.removeEventListener('resize', checkMobile);
    }

    , []);

  // Update high score when score changes
  useEffect(()=> {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("pokemonHighScore", score.toString());
      }
    }

    , [score, highScore]);

  // Update best streak when streak changes
  useEffect(() => {
      if (streak > bestStreak) {
        setBestStreak(streak);
        localStorage.setItem("pokemonBestStreak", streak.toString());
      }

      // Check for streak milestones
      if (streak > 0 && streak % 5===0 && streak !==streakMilestone) {
        setStreakMilestone(streak);
        setTimeout(()=> setStreakMilestone(null), 3000);
      }
  }, [streak, bestStreak]); // eslint-disable-line react-hooks/exhaustive-deps

  // Online/Offline detection
  useEffect(() => {
    // Online/offline event listeners removed (no isOnline state)
    // You can add custom offline UI here if desired
    return () => {};
  }, []);

  // Load game state from offline storage on mount
  useEffect(() => {
    const loadGameState = async () => {
      const savedState = await offlineStorage.loadGameState();
      if (savedState) {
        setScore(savedState.score || 0);
        setStreak(savedState.streak || 0);
        if (savedState.highScore > highScore) {
          setHighScore(savedState.highScore);
        }
        if (savedState.bestStreak > bestStreak) {
          setBestStreak(savedState.bestStreak);
        }
      }
    };
    loadGameState();
  }, [offlineStorage, highScore, bestStreak]);

  // Save game state to offline storage when it changes
  useEffect(() => {
    const saveGameState = async () => {
      await offlineStorage.saveGameState({
        score,
        streak,
        highScore,
        bestStreak,
        timestamp: Date.now()
      });
    };
    if (score > 0 || streak > 0) {
      saveGameState();
    }
  }, [score, streak, highScore, bestStreak, offlineStorage]);

  const stats=[ {
    key: "totalStats",
      label: "Base Stat Total",
  }

  ,
    {
    key: "height",
      label: "Height",
  }

  ,
    {
    key: "weight",
      label: "Weight",
  }

  ,
    {
    key: "hp",
      label: "HP",
  }

  ,
    {
    key: "attack",
      label: "Attack",
  }

  ,
    {
    key: "defense",
      label: "Defense",
  }

  ,
    {
    key: "speed",
      label: "Speed",
  }

  ,
  ];

  const getRandomStat=()=>stats[Math.floor(Math.random() * stats.length)];
  const getRandomPokemonId=()=>Math.floor(Math.random() * 1025)+1; // Gen 1-9

  const sanitizeUrl=(url)=> {
    if ( !url || typeof url !=='string') return null;

    try {
      const parsedUrl=new URL(url);

      // Only allow URLs from PokeAPI's official domains
      if (parsedUrl.hostname==='raw.githubusercontent.com'|| parsedUrl.hostname.endsWith('.pokeapi.co')) {
        return url;
      }
    }

    catch {
      // Invalid URL
    }

    return null;
  }

  ;

  const fetchPokemon=async (id)=> {
    console.log("Fetching Pokemon with ID:", id);
    // Try cache first
    let cached = await offlineStorage.getCachedPokemon(id);
    if (cached) {
      console.log("Loaded from cache:", cached.name);
      return cached;
    }
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        cache: "force-cache",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const totalStats = data.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
      const sprite = sanitizeUrl(data.sprites.other["official-artwork"].front_default || data.sprites.front_default);
      
      // Preload image with promise-based loading
      if (sprite) {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = sprite;
        });
      }
      const pokemon = {
        id: data.id,
        name: data.name,
        sprite: sprite,
        types: data.types.map((t) => t.type.name),
        totalStats: totalStats,
        height: data.height,
        weight: data.weight,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
      };
      // Save to cache
      await offlineStorage.savePokemonToCache(pokemon);
      console.log("Successfully fetched:", pokemon.name);
      return pokemon;
    } catch (error) {
  console.error(`Error fetching Pokemon ${id}:`, error);
      // If offline, try fallback
      if (!navigator.onLine) {
        const fallback = await offlineStorage.getFallbackPokemon(id);
        if (fallback) {
          console.log("Using fallback Pokemon:", fallback.name);
          return fallback;
        }
      }
      throw error;
    }
=======
>>>>>>> parent of 272d113 (backup)
  };

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("pokemonHighScore");

    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10));
    }

    const savedBestStreak = localStorage.getItem("pokemonBestStreak");

    if (savedBestStreak) {
      setBestStreak(Number.parseInt(savedBestStreak, 10));
    }
  }, []);

  // Update high score when score changes
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("pokemonHighScore", score.toString());
    }
  }, [score, highScore]);

  // Update best streak when streak changes
  useEffect(() => {
    if (streak > bestStreak) {
      setBestStreak(streak);
      localStorage.setItem("pokemonBestStreak", streak.toString());
    }

    // Check for streak milestones
    if (streak > 0 && streak % 5 === 0 && streak !== streakMilestone) {
      setStreakMilestone(streak);
      setTimeout(() => setStreakMilestone(null), 3000);
    }
  }, [streak, bestStreak]);
  // Removed streakMilestone from dependencies to prevent loop

  const stats = [
    {
      key: "totalStats",
      label: "Base Stat Total",
    },
    {
      key: "height",
      label: "Height",
    },
    {
      key: "weight",
      label: "Weight",
    },
    {
      key: "hp",
      label: "HP",
    },
    {
      key: "attack",
      label: "Attack",
    },
    {
      key: "defense",
      label: "Defense",
    },
    {
      key: "speed",
      label: "Speed",
    },
  ];

  const getRandomStat = () => stats[Math.floor(Math.random() * stats.length)];
  const getRandomPokemonId = () => Math.floor(Math.random() * 1025) + 1; // Gen 1-9

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      cache: "force-cache",
    });
    const data = await response.json();

    const totalStats = data.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );
    const sprite =
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default;

    // Preload image
    const img = new Image();
    img.src = sprite;

    return {
      id: data.id,
      name: data.name,
      sprite: sprite,
      types: data.types.map((t) => t.type.name),
      totalStats: totalStats,
      height: data.height,
      weight: data.weight,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
    };
  };

  const loadNewPokemon = async () => {
    setLoading(true);
    setShowResult(false);
    setIsCorrect(null);
    setAnimateCards(false);

    let left = await fetchPokemon(getRandomPokemonId());
    let right = await fetchPokemon(getRandomPokemonId());
    let stat = getRandomStat();

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

    // Trigger entrance animation and preload next Pokemon
    setTimeout(() => setAnimateCards(true), 100);
    preloadNextPokemon();
  };

  const preloadNextPokemon = async () => {
    try {
      const nextPokemon = await fetchPokemon(getRandomPokemonId());
      setPreloadedPokemon(nextPokemon);
    } catch {
      // Silently fail, will fetch normally if preload fails
      setPreloadedPokemon(null);
    }
  };

  const handleGuess = (guess) => {
    if (showResult) return;

    setShowResult(true);

    const leftValue = leftPokemon[currentStat.key];
    const rightValue = rightPokemon[currentStat.key];

    const correct =
      (guess === "higher" && rightValue >= leftValue) ||
      (guess === "lower" && rightValue <= leftValue);

    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);

      setTimeout(
        () => {
          setAnimateCards(false);

          setTimeout(
            async () => {
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

              while (
                rightPokemon[newStat.key] === newPokemon[newStat.key] &&
                attempts < 20
              ) {
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
            },

            300
          );
        },

        1500
      );
    } else {
      setStreak(0);

      setTimeout(
        () => {
          setGameOver(true);
        },

        1500
      );
    }
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
    localStorage.removeItem("pokemonBestStreak");
    localStorage.removeItem("pokemonHighScore");
    setHighScore(0);
    setBestStreak(0);
    // Rick Roll easter egg
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  useEffect(() => {
    loadNewPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="loading">
        {" "}
        <div className="pokeball-loader"></div> <p>Loading Pokémon...</p>{" "}
      </div>
    );
  }

<<<<<<< HEAD
  setRightPokemon(newPokemon);
  setCurrentStat(newStat);
  setShowResult(false);
  setIsCorrect(null);
  setTimeout(() => setAnimateCards(true), 100);

  // Preload next Pokemon in background
  preloadNextPokemon();
};

const handleCorrectGuess=()=> {
  setScore(score + 1);
  setStreak(streak + 1);

  setTimeout(()=> {
    setAnimateCards(false);
    setTimeout(() => {
      loadNextRound();
    }, 300);
  }, 1500);
};

const handleIncorrectGuess=()=> {
  setStreak(0);

  setTimeout(()=> {
      setGameOver(true);
    }

    , 1500);
}

;

const handleGuess=(guess)=> {
  if (showResult) return;

  setShowResult(true);

  const leftValue=leftPokemon[currentStat.key];
  const rightValue=rightPokemon[currentStat.key];

  const correct=(guess==="higher"&& rightValue >=leftValue) || (guess==="lower"&& rightValue <=leftValue);

  setIsCorrect(correct);

  // Accessibility announcement
  let announcement;
  if (correct) {
    announcement = 'Correct! ' + rightPokemon.name + ' has ' + rightValue + ' ' + currentStat.label.toLowerCase() + ', which is ' + guess + ' than ' + leftPokemon.name + "'s " + leftValue + '. Score: ' + (score + 1) + '.';
  } else {
    announcement = 'Wrong! ' + rightPokemon.name + ' has ' + rightValue + ' ' + currentStat.label.toLowerCase() + ', not ' + guess + ' than ' + leftPokemon.name + "'s " + leftValue + '. Game over.';
  }

  setScreenReaderAnnouncement(announcement);

  // Touch feedback for mobile
  if (isMobile) {
    setTouchFeedback(correct ? 'success' : 'error');
    setTimeout(()=> setTouchFeedback(null), 300);

    // Haptic feedback if available
    if ('vibrate'in navigator) {
      navigator.vibrate(correct ? [50] : [100, 50, 100]);
    }
=======
  if (gameOver) {
    return (
      <div className="game-over fade-in">
        {" "}
        <h1 className="game-over-title">Game Over !</h1>{" "}
        <p className="final-score pulse">Final Score: {score}</p>{" "}
        {score === highScore && score > 0 && (
          <p className="new-high-score pop-in">🎉 New High Score ! 🎉</p>
        )}
        <p className="high-score-display">High Score: {highScore}</p>{" "}
        {streak === bestStreak && streak > 0 && (
          <p className="new-high-score pop-in">🔥 New Best Streak ! 🔥</p>
        )}
        <p className="high-score-display">Best Streak: {bestStreak}</p>{" "}
        <button onClick={restartGame} className="restart-button bounce">
          {" "}
          Play Again{" "}
        </button>{" "}
        <button onClick={resetHighScore} className="reset-high-score-button">
          {" "}
          Reset High Score{" "}
        </button>{" "}
      </div>
    );
>>>>>>> parent of 272d113 (backup)
  }

  return (
    <div className="game-container">
      <button
        onClick={toggleDarkMode}
        className="dark-mode-toggle"
        aria-label="toggle dark mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>{" "}
      <div className="score-container slide-down">
        {" "}
        <div className="score">Score: {score}</div>{" "}
        <div className="high-score">High Score: {highScore}</div>{" "}
        <div className="streak">
          {" "}
          🔥 Streak: {streak}
          {bestStreak > 0 && (
            <span className="best-streak"> (Best: {bestStreak})</span>
          )}
        </div>{" "}
      </div>{" "}
      {streakMilestone && (
        <div className="streak-milestone pop-in">
          {" "}
          🔥 {streakMilestone}
          Streak ! Keep it going ! 🔥{" "}
        </div>
      )}
      <div className="pokemon-cards">
        {" "}
        <div
          className={`pokemon-card left ${animateCards ? "slide-in-left" : ""} ${showResult && isCorrect === false ? "shake" : ""}`}
        >
          {" "}
          <img
            src={leftPokemon.sprite}
            alt={leftPokemon.name}
            width="200"
            height="200"
            loading="eager"
            className="pokemon-image"
          />{" "}
          <h2 className="pokemon-name"> {leftPokemon.name}</h2>{" "}
          <div className="type-badges">
            {leftPokemon.types.map((type) => (
              <span key={type} className={`type-badge type-${type}`}>
                {type}
              </span>
            ))}
          </div>
          <div className="stat-display">
            {" "}
            <p className="stat-label"> {currentStat.label}</p>{" "}
            <p className="stat-value">
              {" "}
              <AnimatedNumber value={leftPokemon[currentStat.key]} />{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="vs-section">
          {" "}
          <div className="vs-text pulse-slow">VS</div>{" "}
          {showResult && (
            <div
              className={`result-indicator ${isCorrect ? "correct" : "incorrect"} pop-in`}
            >
              {" "}
              {isCorrect ? "✓ Correct!" : "✗ Wrong!"}
            </div>
          )}
          <div className="buttons">
            {" "}
            <button
              onClick={() => handleGuess("higher")}
              className="guess-button higher"
              disabled={showResult}
              aria-label="Guess higher stat"
            >
              {" "}
              <span className="button-icon" aria-hidden="true">
                {" "}
                ↑{" "}
              </span>{" "}
              HIGHER{" "}
            </button>{" "}
            <button
              onClick={() => handleGuess("lower")}
              className="guess-button lower"
              disabled={showResult}
              aria-label="Guess lower stat"
            >
              {" "}
              <span className="button-icon" aria-hidden="true">
                {" "}
                ↓{" "}
              </span>{" "}
              LOWER{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div
          className={`pokemon-card right ${animateCards ? "slide-in-right" : ""} ${showResult && isCorrect ? "glow-success" : ""} ${showResult && !isCorrect ? "glow-fail" : ""}`}
        >
          {" "}
          <img
            src={rightPokemon.sprite}
            alt={rightPokemon.name}
            width="200"
            height="200"
            loading="lazy"
            className="pokemon-image"
          />{" "}
          <h2 className="pokemon-name"> {rightPokemon.name}</h2>{" "}
          <div className="type-badges">
            {rightPokemon.types.map((type) => (
              <span key={type} className={`type-badge type-${type}`}>
                {type}
              </span>
            ))}
          </div>
          <div className="stat-display">
            {" "}
            <p className="stat-label"> {currentStat.label}</p>{" "}
            {showResult ? (
              <p className="stat-value revealed pop-in">
                {" "}
                <AnimatedNumber value={rightPokemon[currentStat.key]} />{" "}
              </p>
            ) : (
              <p className="stat-value hidden pulse-slow">???</p>
            )}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

<<<<<<< HEAD
;

const handleTouchEnd=(e)=> {
  if ( !isMobile || showResult || !touchStart) return;

  const touch=e.changedTouches[0];
  const deltaY=touchStart.y - touch.clientY;
  const deltaX=Math.abs(touchStart.x - touch.clientX);

  // Only trigger if it's more vertical than horizontal and significant distance
  if (Math.abs(deltaY) > deltaX && Math.abs(deltaY) > 50) {
    if (deltaY > 0) {
      handleGuess("higher");
    }

    else {
      handleGuess("lower");
    }
  }

  setTouchStart(null);
}

;

const [touchStart,
setTouchStart]=useState(null);

const restartGame=()=> {
  setScore(0);
  setStreak(0);
  setGameOver(false);
  setShowResult(false);
  setIsCorrect(null);
  loadNewPokemon();
}

;

const resetHighScore=()=> {
  localStorage.removeItem("pokemonBestStreak");
  localStorage.removeItem("pokemonHighScore");
  setHighScore(0);
  setBestStreak(0);
  // Rick Roll easter egg
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
}

;

  useEffect(() => {
    loadNewPokemon();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

if (loading) {
  return (
    <main className="game-container" aria-label="Loading Pokemon Higher or Lower Game">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Loading new Pokemon battle...
      </div>
      
      <ErrorBoundary fallback={<GameStateError onRetry={() => globalThis.location.reload()} />}>
        <ScoreDisplaySkeleton />
      </ErrorBoundary>

      <div className="pokemon-cards">
        <ErrorBoundary fallback={<NetworkError onRetry={loadNewPokemon} />}>
          <PokemonCardSkeleton position="left" className="skeleton-fade-in" />
        </ErrorBoundary>

        <div className="vs-section">
          <div className="vs-text pulse-slow">VS</div>
        </div>

        <ErrorBoundary fallback={<NetworkError onRetry={loadNewPokemon} />}>
          <PokemonCardSkeleton position="right" className="skeleton-fade-in" />
        </ErrorBoundary>
      </div>

      <ErrorBoundary fallback={<GameStateError onRetry={loadNewPokemon} />}>
        <GameControlsSkeleton className="skeleton-fade-in" />
      </ErrorBoundary>
    </main>
  );
}

if (gameOver) {
  return (<div className="game-over fade-in"> {
      " "
    }

    <h1 className="game-over-title">Game Over !</h1> {
      " "
    }

    <p className="final-score pulse">Final Score: {
      score
    }

    </p> {
      " "
    }

      {
      score===highScore && score > 0 && (<p className="new-high-score pop-in">🎉 New High Score ! 🎉</p>)
    }

    <p className="high-score-display">High Score: {
      highScore
    }

    </p> {
      " "
    }

      {
      streak===bestStreak && streak > 0 && (<p className="new-high-score pop-in">🔥 New Best Streak ! 🔥</p>)
    }

    <p className="high-score-display">Best Streak: {
      bestStreak
    }

    </p> {
      " "
    }

    <button onClick= {
      restartGame
    }

    className="restart-button bounce"> {
      " "
    }

    Play Again {
      " "
    }

    </button> {
      " "
    }

    <button onClick= {
      resetHighScore
    }

    className="reset-high-score-button"> {
      " "
    }

    Reset High Score {
      " "
    }

    </button> {
      " "
    }

    </div>);
}

return (<main className="game-container"

  onTouchStart= {
    handleTouchStart
  }

  onTouchEnd= {
    handleTouchEnd
  }

  aria-label="Pokemon Higher or Lower Game"

  > {
    /* Screen reader announcements */
  }

  <div aria-live="polite"
  aria-atomic="true"
  className="sr-only"

  > {
    screenReaderAnnouncement
  }

  </div> {
    /* Touch feedback overlay */
  }

    {
      touchFeedback && (
        <div className={"touch-feedback " + touchFeedback} aria-hidden="true">
          {touchFeedback === 'success' ? '✓' : '✗'}
        </div>
      )
    }

    {
    /* Mobile swipe instructions */
  }

    {
    isMobile && !showResult && leftPokemon && rightPokemon && (<div className="mobile-instructions"aria-hidden="true"> <span>Swipe ↑ Higher | Swipe ↓ Lower</span> </div>)
  }

  <ErrorBoundary fallback={<GameStateError onRetry={() => globalThis.location.reload()} />}>
    <ScoreDisplay 
      score={score}
      highScore={highScore}
      streak={streak}
      bestStreak={bestStreak}
      streakMilestone={streakMilestone}
    />
  </ErrorBoundary>

  <div className="pokemon-cards">
    <ErrorBoundary fallback={<NetworkError onRetry={loadNewPokemon} />}>
      <PokemonCard 
        pokemon={leftPokemon}
        currentStat={currentStat}
        position="left"
        animateCards={animateCards}
        showResult={showResult}
        isCorrect={isCorrect}
      />
    </ErrorBoundary>

  <div className="vs-section"> {
    " "
  }

  <div className="vs-text pulse-slow">VS</div> {
    " "
  }

    {
      showResult && (
        <div className={`result-indicator ${isCorrect ? "correct" : "incorrect"} pop-in`}>
          {
        isCorrect ? "✓ Correct!" : "✗ Wrong!"
      }

      </div>)
  }

  <ErrorBoundary fallback={<GameStateError onRetry={loadNewPokemon} />}>
    <GameControls 
      onGuess={handleGuess}
      onToggleDarkMode={toggleDarkMode}
      showResult={showResult}
      isMobile={isMobile}
      darkMode={darkMode}
      rightPokemon={rightPokemon}
      leftPokemon={leftPokemon}
      currentStat={currentStat}
    />
  </ErrorBoundary>

      </div> {
        " "
      }

    <ErrorBoundary fallback={<NetworkError onRetry={loadNewPokemon} />}>
      <PokemonCard 
        pokemon={rightPokemon}
        currentStat={currentStat}
        position="right"
        animateCards={animateCards}
        showResult={showResult}
        isCorrect={isCorrect}
      />
    </ErrorBoundary>
  </div>

  </main>);
    }
  export default App;
=======
export default App;
>>>>>>> parent of 272d113 (backup)

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './App.css'

function AnimatedNumber({ value, duration = 1000 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime = null
    const startValue = 0

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime

      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(startValue + (value - startValue) * easeOutQuart)
      
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])
  return <span>{displayValue}</span>
}

AnimatedNumber.propTypes = {
  value: PropTypes.number.isRequired,
  duration: PropTypes.number
}

function App() {
  const [leftPokemon, setLeftPokemon] = useState(null)
  const [rightPokemon, setRightPokemon] = useState(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [currentStat, setCurrentStat] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [animateCards, setAnimateCards] = useState(false)
  const [preloadedPokemon, setPreloadedPokemon] = useState(null)

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('pokemonHighScore')
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10))
    }
  }, [])

  // Update high score when score changes
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('pokemonHighScore', score.toString())
    }
  }, [score, highScore])

  const stats = [
    { key: 'totalStats', label: 'Base Stat Total' },
    { key: 'height', label: 'Height' },
    { key: 'weight', label: 'Weight' },
    { key: 'hp', label: 'HP' },
    { key: 'attack', label: 'Attack' },
    { key: 'defense', label: 'Defense' },
    { key: 'speed', label: 'Speed' },
  ]

  const getRandomStat = () => stats[Math.floor(Math.random() * stats.length)]
  const getRandomPokemonId = () => Math.floor(Math.random() * 1025) + 1 // Gen 1-9

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      cache: 'force-cache',
    })
    const data = await response.json()

    const totalStats = data.stats.reduce((sum, stat) => sum + stat.base_stat, 0)
    const sprite = data.sprites.other['official-artwork'].front_default || data.sprites.front_default

    // Preload image
    const img = new Image()
    img.src = sprite

    return {
      id: data.id,
      name: data.name,
      sprite: sprite,
      totalStats: totalStats,
      height: data.height,
      weight: data.weight,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
    }
  }

  const loadNewPokemon = async () => {
    setLoading(true)
    setShowResult(false)
    setIsCorrect(null)
    setAnimateCards(false)

    let left = await fetchPokemon(getRandomPokemonId())
    let right = await fetchPokemon(getRandomPokemonId())
    let stat = getRandomStat()

    // Ensure different Pokemon
    while (left.id === right.id) {
      right = await fetchPokemon(getRandomPokemonId())
    }

    // Ensure the chosen stat has different values
    let attempts = 0
    while (left[stat.key] === right[stat.key] && attempts < 20) {
      // Try a different stat first
      stat = getRandomStat()
      attempts++

      // If tried all stats and still equal, get a new right Pokemon
      if (attempts % 7 === 0) {
        right = await fetchPokemon(getRandomPokemonId())
        while (left.id === right.id) {
          right = await fetchPokemon(getRandomPokemonId())
        }
        stat = getRandomStat()
      }
    }

    setLeftPokemon(left)
    setRightPokemon(right)
    setCurrentStat(stat)
    setLoading(false)

    // Trigger entrance animation and preload next Pokemon
    setTimeout(() => setAnimateCards(true), 100)
    preloadNextPokemon()
  }

  const preloadNextPokemon = async () => {
    try {
      const nextPokemon = await fetchPokemon(getRandomPokemonId())
      setPreloadedPokemon(nextPokemon)
    } catch {
      // Silently fail, will fetch normally if preload fails
      setPreloadedPokemon(null)
    }
  }

  const handleGuess = (guess) => {
    if (showResult) return

    setShowResult(true)

    const leftValue = leftPokemon[currentStat.key]
    const rightValue = rightPokemon[currentStat.key]

    const correct = 
      (guess === 'higher' && rightValue >= leftValue) || 
      (guess === 'lower' && rightValue <= leftValue)

    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
      setTimeout(() => {
        setAnimateCards(false)
        setTimeout(async () => {
          setLeftPokemon(rightPokemon)
          
          // Use preloaded Pokemon if available, otherwise fetch new one
          let newPokemon = preloadedPokemon
          if (!newPokemon || newPokemon.id === rightPokemon.id) {
            newPokemon = await fetchPokemon(getRandomPokemonId())
            // Ensure different from current
            while (newPokemon.id === rightPokemon.id) {
              newPokemon = await fetchPokemon(getRandomPokemonId())
            }
          }
          
          let newStat = getRandomStat()
          // Ensure stat has different values
          let attempts = 0
          while (rightPokemon[newStat.key] === newPokemon[newStat.key] && attempts < 20) {
            newStat = getRandomStat()
            attempts++
            if (attempts % 7 === 0) {
              newPokemon = await fetchPokemon(getRandomPokemonId())
              while (newPokemon.id === rightPokemon.id) {
                newPokemon = await fetchPokemon(getRandomPokemonId())
              }
              newStat = getRandomStat()
            }
          }
          
          setRightPokemon(newPokemon)
          setCurrentStat(newStat)
          setShowResult(false)
          setIsCorrect(null)
          setTimeout(() => setAnimateCards(true), 100)
          
          // Preload next Pokemon in background
          preloadNextPokemon()
        }, 300)
      }, 1500)
    } else {
      setTimeout(() => {
        setGameOver(true)
      }, 1500)
    }
  }

  const restartGame = () => {
    setScore(0)
    setGameOver(false)
    setShowResult(false)
    setIsCorrect(null)
    loadNewPokemon()
  }

  const resetHighScore = () => {
    localStorage.removeItem('pokemonHighScore')
    setHighScore(0)
  }

  useEffect(() => {
    loadNewPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="pokeball-loader"></div>
        <p>Loading Pokémon...</p>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="game-over fade-in">
        <h1 className="game-over-title">Game Over!</h1>
        <p className="final-score pulse">Final Score: {score}</p>
        {score === highScore && score > 0 && (
          <p className="new-high-score pop-in">🎉 New High Score! 🎉</p>
        )}
        <p className="high-score-display">High Score: {highScore}</p>
        <button onClick={restartGame} className="restart-button bounce">
          Play Again
        </button>
        <button onClick={resetHighScore} className="reset-high-score-button">
          Reset High Score
        </button>
      </div>
    )
  }

  return (
    <div className="game-container">
      <div className="score-container slide-down">
        <div className="score">Score: {score}</div>
        <div className="high-score">High Score: {highScore}</div>
      </div>

      <div className="pokemon-cards">
        <div className={`pokemon-card left ${animateCards ? 'slide-in-left' : ''} ${showResult && isCorrect === false ? 'shake' : ''}`}>
          <img 
            src={leftPokemon.sprite} 
            alt={leftPokemon.name}
            width="200"
            height="200"
            loading="eager"
            className="pokemon-image"
          />
          <h2 className="pokemon-name">{leftPokemon.name}</h2>
          <div className="stat-display">
            <p className="stat-label">{currentStat.label}</p>
            <p className="stat-value">
              <AnimatedNumber value={leftPokemon[currentStat.key]} />
            </p>
          </div>
        </div>

        <div className="vs-section">
          <div className="vs-text pulse-slow">VS</div>
          
          {showResult && (
            <div className={`result-indicator ${isCorrect ? 'correct' : 'incorrect'} pop-in`}>
              {isCorrect ? '✓ Correct!' : '✗ Wrong!'}
            </div>
          )}

          <div className="buttons">
            <button 
              onClick={() => handleGuess('higher')} 
              className="guess-button higher"
              disabled={showResult}
              aria-label="Guess higher stat"
            >
              <span className="button-icon" aria-hidden="true">↑</span>
              {' '}
              HIGHER
            </button>
            <button 
              onClick={() => handleGuess('lower')} 
              className="guess-button lower"
              disabled={showResult}
              aria-label="Guess lower stat"
            >
              <span className="button-icon" aria-hidden="true">↓</span>
              {' '}
              LOWER
            </button>
          </div>
        </div>

        <div className={`pokemon-card right ${animateCards ? 'slide-in-right' : ''} ${showResult && isCorrect ? 'glow-success' : ''} ${showResult && !isCorrect ? 'glow-fail' : ''}`}>
          <img 
            src={rightPokemon.sprite} 
            alt={rightPokemon.name}
            width="200"
            height="200"
            loading="lazy"
            className="pokemon-image"
          />
          <h2 className="pokemon-name">{rightPokemon.name}</h2>
          <div className="stat-display">
            <p className="stat-label">{currentStat.label}</p>
            {showResult ? (
              <p className="stat-value revealed pop-in">
                <AnimatedNumber value={rightPokemon[currentStat.key]} />
              </p>
            ) : (
              <p className="stat-value hidden pulse-slow">???</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
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

function App() {
  const [leftPokemon, setLeftPokemon] = useState(null)
  const [rightPokemon, setRightPokemon] = useState(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [currentStat, setCurrentStat] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [animateCards, setAnimateCards] = useState(false)

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
  const getRandomPokemonId = () => Math.floor(Math.random() * 898) + 1

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
    
    const left = await fetchPokemon(getRandomPokemonId())
    const right = await fetchPokemon(getRandomPokemonId())
    
    if (left.id === right.id) {
      loadNewPokemon()
      return
    }
    
    setLeftPokemon(left)
    setRightPokemon(right)
    setCurrentStat(getRandomStat())
    setLoading(false)

    // Trigger entrance animation
    setTimeout(() => setAnimateCards(true), 100)
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
        setTimeout(() => {
          setLeftPokemon(rightPokemon)
          fetchPokemon(getRandomPokemonId()).then(newPokemon => {
            setRightPokemon(newPokemon)
            setCurrentStat(getRandomStat())
            setShowResult(false)
            setIsCorrect(null)
            setTimeout(() => setAnimateCards(true), 100)
          })
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
        <button onClick={restartGame} className="restart-button bounce">Play Again</button>
      </div>
    )
  }

  return (
    <div className="game-container">
      <div className="score slide-down">Score: {score}</div>
      
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
              HIGHER
            </button>
            <button 
              onClick={() => handleGuess('lower')} 
              className="guess-button lower"
              disabled={showResult}
              aria-label="Guess lower stat"
            >
              <span className="button-icon" aria-hidden="true">↓</span>
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
# Trale - Pokémon Higher or Lower Game 🎮

![Deploy Status](https://github.com/nimpeboss/Trale/actions/workflows/deploy.yml/badge.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![License](https://img.shields.io/badge/license-Educational-blue)

A fun and addictive Pokémon guessing game built with React and Vite. Test your Pokémon knowledge by guessing which Pokémon has higher stats!

## 🎯 Features

- **1025 Pokémon**: All Pokémon from Generations 1-9
- **7 Random Stats**: Compare Base Stat Total, Height, Weight, HP, Attack, Defense, or Speed
- **Animated Counters**: Smooth number animations with easing effects
- **High Score System**: Track your best streak across sessions
- **Sound Effects**: Dynamic audio feedback for correct/wrong answers and achievements (toggle on/off)
- **Beautiful Design**: Gradient backgrounds, card animations, and polished UI
- **Smart Gameplay**: No duplicate stats, instant transitions

## 🎮 How to Play

1. Two Pokémon cards will appear - one with a visible stat, one with a hidden "???" stat
2. Look at the left Pokémon's stat value
3. Guess if the right Pokémon's stat is **HIGHER** or **LOWER**
4. The right card reveals its stat and shows if you're correct
5. If correct, your score increases and a new Pokémon appears on the right
6. If wrong, game over! Try to beat your high score
7. Stats are randomized each round (could be HP, Attack, Height, etc.)
8. Use the "Reset High Score" button to start fresh
9. Toggle sound effects on/off using the 🔊/🔇 button in the top right

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/nimpeboss/Trale.git
   cd Trale
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the game:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

## 🌐 Data Source

This game uses the [PokeAPI](https://pokeapi.co/) - a free RESTful Pokémon API providing data for all Pokémon from Generations 1-9.

## 📚 Technical Documentation

For detailed technical information about the implementation, architecture, and optimizations, see [TECHNICAL.md](./TECHNICAL.md).
For GitHub Pages deployment and CI/CD setup, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🌐 Live Demo

The game is automatically deployed to GitHub Pages:
👉 **[Play Now](https://nimpeboss.github.io/Trale/)**

## 🧪 Testing

This project includes automated tests with Vitest:

```bash
# Run all tests
npm test
# Run tests in watch mode
npm run test:watch
# Run tests with coverage
npm run test:coverage
# Run tests with UI
npm run test:ui
```

## 📝 License

This project is created for educational purposes as part of a client-side development course.

---

**Course**: Client-Side Development | **Year**: 2025

# Trale - Pokemon Higher or Lower Game 🎮

A fun and addictive Pokemon guessing game built with React and Vite. Test your Pokemon knowledge by guessing which Pokemon has higher stats!

## 📋 About

An interactive web game where players compare Pokemon statistics in a "Higher or Lower" format. Players are shown two Pokemon cards - one with a revealed stat and one hidden. The goal is to guess whether the hidden Pokemon's stat is higher or lower than the revealed one.

## 🎯 Features

- **1025 Pokemon** - All Pokemon from Generations 1-9
- **7 Random Stats** - Compare Base Stat Total, Height, Weight, HP, Attack, Defense, or Speed
- **Animated Counters** - Smooth number animations with easing effects
- **High Score System** - Track your best streak across sessions
- **Beautiful Design** - Gradient backgrounds, card animations, and polished UI
- **Smart Gameplay** - No duplicate stats, instant transitions

## 🎮 How to Play

1. Two Pokemon cards will appear - one with a visible stat, one with a hidden "???" stat
2. Look at the left Pokemon's stat value
3. Guess if the right Pokemon's stat is **HIGHER** or **LOWER**
4. The right card reveals its stat and shows if you're correct
5. If correct, your score increases and a new Pokemon appears on the right
6. If wrong, game over! Try to beat your high score
7. Stats are randomized each round (could be HP, Attack, Height, etc.)
8. Use the "Reset High Score" button to start fresh

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

This game uses the [PokeAPI](https://pokeapi.co/) - a free RESTful Pokemon API providing data for all Pokemon from Generations 1-9.

## 📚 Technical Documentation

For detailed technical information about the implementation, architecture, and optimizations, see [TECHNICAL.md](./TECHNICAL.md).

## 📝 License

This project is created for educational purposes as part of a client-side development course.

---

**Course**: Client-Side Development | **Year**: 2025

## 🚀 Technologies Used

- **React 19.1.1** - JavaScript library for building user interfaces
- **Vite 7.1.7** - Fast build tool and development server
- **PokeAPI** - RESTful Pokemon data API (https://pokeapi.co/api/v2/)
- **localStorage** - Browser storage for high score persistence
- **CSS Animations** - Keyframe animations for smooth transitions
- **Terser** - JavaScript minification for production optimization
- **ESLint** - Code linting and quality assurance

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nimpeboss/Trale.git
   cd Trale
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 💻 Development

To start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## � How to Play

1. Two Pokemon cards will appear - one with a visible stat, one with a hidden "???" stat
2. Look at the left Pokemon's stat value
3. Guess if the right Pokemon's stat is **HIGHER** or **LOWER**
4. The right card reveals its stat and shows if you're correct
5. If correct, your score increases and a new Pokemon appears on the right
6. If wrong, game over! Try to beat your high score
7. Stats are randomized each round (could be HP, Attack, Height, etc.)
8. Use the "Reset High Score" button to start fresh

## �🏗️ Building for Production

To create a production-optimized build:

```bash
npm run build
```

The built files will be generated in the `dist` directory.

## 👀 Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 🧹 Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
Trale/
├── public/
│   └── robots.txt        # SEO crawler configuration
├── src/
│   ├── assets/           # Images, fonts, and other assets
│   ├── App.jsx           # Main game component with Pokemon logic
│   ├── App.css           # Game styles and animations
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── index.html            # HTML template with SEO meta tags
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration with Terser minification
└── eslint.config.js      # ESLint configuration
```

## 🎨 Key Features Implementation

### AnimatedNumber Component

Custom React component using `requestAnimationFrame` for smooth number counting animations with easeOutQuart easing.

### Smart Preloading

Background Pokemon fetching during gameplay ensures instant transitions between rounds without visible loading.

### Duplicate Prevention

Advanced logic ensures no two Pokemon with identical stat values appear, maintaining fair gameplay.

### High Score Persistence

Uses localStorage API to save and retrieve high scores across browser sessions.

### Performance Optimizations

- Image preloading with `new Image()`
- DNS prefetch and preconnect for PokeAPI
- Terser minification removing console logs
- CSS containment and will-change properties
- Force-cache strategy for API requests

## 🌐 API Information

This game uses the [PokeAPI](https://pokeapi.co/) - a free RESTful Pokemon API with no authentication required.

**Endpoint used**: `https://pokeapi.co/api/v2/pokemon/{id}`

**Data fetched**:

- Pokemon name and ID
- Official artwork sprites
- Base stats (HP, Attack, Defense, Speed)
- Height and weight
- Total base stats (calculated sum)

## 👨‍🎓 Course Information

- **Course**: Client-Side Development
- **Project**: Trale - Pokemon Higher or Lower Game
- **Year**: 2025
- **Focus Areas**: React Hooks, State Management, API Integration, Performance Optimization, SEO

## 📝 License

This project is created for educational purposes as part of a client-side development course.

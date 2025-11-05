# Technical Documentation

Comprehensive technical details about the Trale Pokemon Higher or Lower game implementation.

## 🚀 Technologies & Stack

- **React 19.1.1** - JavaScript library for building user interfaces
- **Vite 7.1.7** - Fast build tool and development server
- **PokeAPI** - RESTful Pokemon data API (https://pokeapi.co/api/v2/)
- **localStorage** - Browser storage for high score persistence
- **CSS Animations** - Keyframe animations for smooth transitions
- **Terser** - JavaScript minification for production optimization
- **ESLint** - Code linting and quality assurance

## 📦 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 💻 Development Commands

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run ESLint:

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
├── eslint.config.js      # ESLint configuration
├── README.md             # User-facing documentation
└── TECHNICAL.md          # This file - technical documentation
```

## 🎨 Key Features Implementation

### AnimatedNumber Component

Custom React component using `requestAnimationFrame` for smooth number counting animations.

**Implementation**:

- Uses `useEffect` hook to trigger animation when value changes
- Implements easeOutQuart easing function for natural deceleration
- Calculates progress over specified duration (default 1000ms)
- Updates display value on each animation frame

```javascript
const easeOutQuart = 1 - Math.pow(1 - progress, 4);
const current = Math.floor(startValue + (value - startValue) * easeOutQuart);
```

### Smart Preloading System

Background Pokemon fetching during gameplay ensures instant transitions between rounds.

**Flow**:

1. Player starts round with two Pokemon displayed
2. While player is thinking/guessing, next Pokemon preloads in background
3. On correct guess, preloaded Pokemon instantly appears
4. New preload starts immediately for next round
5. Fallback to normal fetch if preload unavailable

**Benefits**:

- Eliminates visible loading between rounds
- Maintains smooth gameplay experience
- Graceful degradation if preload fails

### Duplicate Prevention Logic

Advanced algorithm ensures no identical stat values appear in the same round.

**Process**:

1. Fetch two random Pokemon
2. Ensure different Pokemon IDs (no comparing same Pokemon)
3. Select random stat to compare
4. Check if stat values are identical
5. If identical, try different stat (up to 7 stats available)
6. After cycling through stats, fetch new Pokemon if still identical
7. Limit attempts to prevent infinite loops

**Edge Cases Handled**:

- Same Pokemon ID
- Identical stat values across all stats
- Maximum attempt limit (20 iterations)

### High Score Persistence

Uses localStorage API to save and retrieve high scores across browser sessions.

**Implementation**:

- Save on score update: `localStorage.setItem('pokemonHighScore', score.toString())`
- Load on mount: `localStorage.getItem('pokemonHighScore')`
- Reset functionality: `localStorage.removeItem('pokemonHighScore')`
- Automatic update when current score exceeds high score

**Data Format**:

- Key: `'pokemonHighScore'`
- Value: String representation of integer score

## ⚡ Performance Optimizations

### API Request Optimization

**Strategies**:

- Force-cache strategy: `cache: 'force-cache'` in fetch requests
- Preloading system reduces perceived latency
- Background fetching during gameplay
- Image preloading with `new Image()`

### Network Optimization

**HTML Head Optimizations**:

```html
<link rel="preconnect" href="https://pokeapi.co" crossorigin />
<link rel="dns-prefetch" href="https://pokeapi.co" />
<link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
```

### Build Optimization

**Vite Configuration** (`vite.config.js`):

- Terser minification with console.log removal
- Manual chunk splitting (vendor bundle separation)
- ES2015 target for modern browsers
- Asset naming with content hashing

```javascript
terserOptions: {
  compress: {
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ['console.log'],
  },
}
```

### CSS Optimization

**Performance Properties**:

- `contain: layout style` for paint optimization
- `will-change` hints for animated properties
- Hardware-accelerated transforms
- Efficient keyframe animations

### Image Optimization

**Attributes**:

- Width and height specified to prevent CLS (Cumulative Layout Shift)
- `loading="eager"` for above-the-fold content
- `loading="lazy"` for off-screen content
- Sprite preloading during data fetch

## 🌐 API Integration

### PokeAPI Usage

**Endpoint**: `https://pokeapi.co/api/v2/pokemon/{id}`

**ID Range**: 1-1025 (Generation 1-9)

**Data Extraction**:

```javascript
{
  id: data.id,
  name: data.name,
  sprite: data.sprites.other['official-artwork'].front_default,
  totalStats: data.stats.reduce((sum, stat) => sum + stat.base_stat, 0),
  height: data.height,
  weight: data.weight,
  hp: data.stats[0].base_stat,
  attack: data.stats[1].base_stat,
  defense: data.stats[2].base_stat,
  speed: data.stats[5].base_stat,
}
```

**Error Handling**:

- Try-catch blocks for fetch operations
- Fallback for missing sprites
- Graceful degradation on API failure

## 🎭 Animation System

### CSS Keyframe Animations

**Implemented Animations**:

- `slideInLeft` / `slideInRight` - Card entrance
- `pulse` / `pulseSlow` - Breathing effects
- `shake` - Error feedback
- `bounce` - Button interactions
- `fadeIn` - Element appearance
- `popIn` - Scale entrance with overshoot
- `glow` - Success/failure feedback
- `spin` - Loading spinner

**Timing Functions**:

- `ease-out` for natural deceleration
- `cubic-bezier` for custom easing
- `linear` for continuous animations

### React State Transitions

**Animation Triggers**:

- `animateCards` state controls entrance animations
- `showResult` triggers reveal animations
- `isCorrect` determines success/failure effects
- CSS classes applied conditionally via template literals

## 🔒 SEO Implementation

### Meta Tags

**index.html Optimizations**:

- Title and description meta tags
- Open Graph tags for social sharing
- Keywords meta tag
- Viewport configuration

### robots.txt

**Configuration**:

```
User-agent: *
Allow: /
Sitemap: [sitemap-url-placeholder]
```

## 🎯 State Management

### React Hooks Used

**useState**:

- `leftPokemon` / `rightPokemon` - Current Pokemon data
- `score` / `highScore` - Score tracking
- `gameOver` / `loading` / `showResult` - UI states
- `currentStat` - Selected stat for comparison
- `isCorrect` - Answer validation result
- `animateCards` - Animation control
- `preloadedPokemon` - Background loading cache

**useEffect**:

- Load high score on component mount
- Auto-save high score on score change
- Initialize game on mount
- Trigger animations with setTimeout

## 📊 Game Logic Flow

1. **Initialization**
   - Load high score from localStorage
   - Fetch two random Pokemon
   - Select random stat
   - Ensure different Pokemon and stat values
   - Display with entrance animations

2. **Gameplay Loop**
   - Player makes guess (Higher/Lower)
   - Reveal right Pokemon's stat with animation
   - Show result (Correct/Wrong)
   - Update score if correct
   - Transition: left ← right, fetch new right
   - Preload next Pokemon in background
   - Repeat

3. **Game Over**
   - Display final score
   - Show high score
   - Display "New High Score!" if applicable
   - Offer restart and reset options

## 🧪 Focus Areas (Course Objectives)

- **React Hooks** - useState, useEffect for state and side effects
- **State Management** - Complex game state with multiple interconnected pieces
- **API Integration** - RESTful API consumption with fetch
- **Performance Optimization** - Preloading, caching, minification, CSS optimization
- **SEO** - Meta tags, robots.txt, semantic HTML
- **Animations** - CSS keyframes, React state-driven animations
- **User Experience** - Smooth transitions, loading states, error handling
- **Code Quality** - ESLint, clean architecture, component composition

## 📝 Best Practices Applied

- Component composition (AnimatedNumber as reusable component)
- Separation of concerns (logic vs presentation)
- DRY principles (helper functions for repeated logic)
- Descriptive variable and function names
- Comments for complex logic sections
- Error handling and fallbacks
- Accessibility attributes (aria-labels, semantic HTML)
- Responsive design considerations
- Browser API usage (localStorage, requestAnimationFrame)
- Modern JavaScript features (async/await, template literals, optional chaining)

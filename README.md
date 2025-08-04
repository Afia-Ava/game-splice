# Game Splice - Web Gaming Platform

A collection of 9 classic web games with Firebase integration for user accounts and global leaderboards.

## 🎮 Games Included

- **Jumpasaurus** - Help the dinosaur collect food while avoiding cacti
- **Snake Classic** - The classic snake game with modern twists
- **Tetris** - Drop and arrange falling blocks to clear lines
- **Dot Muncher** - Navigate mazes, collect dots, avoid ghosts
- **Space Defender** - Save Earth from alien invaders
- **Sky Navigator** - Guide the bird through obstacles
- **Speed Racer** - Race through traffic and collect coins
- **Memory Master** - Test your memory with card matching
- **Sudoku Solver** - Challenge your mind with number puzzles

## 🔥 Firebase Setup

### 1. Firebase Project Configuration

Your Firebase project details:

- **Project Name**: game-splice
- **Project ID**: game-splice
- **Project Number**: 206158975406
- **App ID**: 1:206158975406:web:9a635491c8c043f554783f

### 2. Get Your Web API Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your "game-splice" project
3. Go to Project Settings → General → Your apps
4. Find your web app and copy the Web API Key

### 3. Configure Firebase

1. Open `firebase-config.js`
2. Replace `"AIzaSyCYourWebAPIKeyHere"` with your actual Web API Key
3. Save the file

**Example:**

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSyC1234567890abcdefghijklmnop', // Your actual API key
  authDomain: 'game-splice.firebaseapp.com',
  projectId: 'game-splice',
  storageBucket: 'game-splice.appspot.com',
  messagingSenderId: '206158975406',
  appId: '1:206158975406:web:9a635491c8c043f554783f',
};
```

### 4. Enable Firebase Services

In your Firebase Console:

**Authentication:**

1. Go to Authentication → Sign-in method
2. Enable "Email/Password" provider
3. Save changes

**Firestore Database:**

1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your preferred location
5. Click "Done"

### 5. Database Structure

The app will automatically create these collections:

```
users/
  {userId}/
    username: string
    email: string
    createdAt: timestamp
    personalBests: object

leaderboards/
  {gameName}/
    scores/
      {scoreId}/
        userId: string
        username: string
        score: number
        timestamp: timestamp
```

## 🚀 Features

- **User Authentication**: Email/password signup and login
- **Global Leaderboards**: Top 10 scores for each game
- **Personal Bests**: Track your best scores
- **Real-time Updates**: Leaderboards update instantly
- **Responsive Design**: Works on desktop and mobile
- **Audio System**: 8-bit chiptune background music
- **Visual Effects**: Mouse glow and click animations

## 🛡️ Security

- Firebase configuration is kept in `firebase-config.js` (gitignored)
- Sensitive credentials are never committed to version control
- Firestore security rules should be configured for production

## 📱 How to Use

1. Open `index.html` in a web browser
2. Click the "Login" button to create an account or sign in
3. Play any game and your scores will be automatically submitted
4. Check the "Leaderboard" to see global rankings
5. Toggle background music with the music control

## 🔧 Development

- All games use the Web Audio API for sound effects
- Firebase integration allows for user management and data persistence
- Modular design makes it easy to add new games
- Clean, retro-styled UI with monospace fonts

## 📝 Adding New Games

To add score submission to a new game:

```javascript
// At the end of your game when final score is determined
if (typeof window.submitScore === 'function') {
  window.submitScore('yourGameName', finalScore);
}
```

## 🎵 Audio Features

- Procedural 8-bit chiptune background music
- Game-specific sound effects for each game
- Volume controls and mute functionality
- Web Audio API for high-quality sound generation

Enjoy gaming! 🎮

# XOLERIC — So'z Ustasi (Savodhon)

Interactive **Progressive Web App (PWA)** for learning the Uzbek language through syllable-by-syllable reading. Features full gamification with levels, XP, streaks, achievements, daily challenges, multiple themes, and a built-in syllable trainer.

## Features

- **Syllable-by-Syllable Reading** — Break down Uzbek words into syllables for phonetic learning
- **Gamification System** — Levels, experience points (XP), streaks, leaderboard
- **Achievements** — Unlockable badges for milestones
- **Daily Challenges** — New exercises every day
- **Multiple Themes** — Dark, Light, Neon, Ocean themes
- **PWA Support** — Installable on mobile devices, works offline
- **Android APK** — Native Android build via `build-apk.sh`
- **Multiple Game Modes** — Syllable trainer, word builder, quick challenges
- **Progress Tracking** — localStorage-based persistence

## Tech Stack

- HTML5, CSS3 (CSS custom properties, glassmorphism, animations)
- Vanilla JavaScript
- PWA (Service Worker + Manifest)
- Google Fonts (Inter)
- Android WebView (for APK build)

## How to Run

```bash
# Serve locally:
python3 -m http.server 8080
# Open http://localhost:8080

# Build Android APK:
bash build-apk.sh
```

The app is fully client-side. Open `index.html` in any modern browser.

## PWA Installation

On Android/iOS, open the app in Chrome/Safari and select **"Add to Home Screen"** for an app-like experience.

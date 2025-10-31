# Cards Deck App (React)

A React app demonstrating JSX, components, props, and component state by manipulating a deck of cards.

## Features
- Draw by clicking the deck
- Deal 5 / Deal 7 (resets hand, deals N random cards)
- Reset (return all to full deck, clear hand)
- Pick/swap by clicking a card; click same card to unpick
- Toss (remove picked card permanently)
- Regroup (shuffle current hand)
- Wildcard (add a random card; duplicates allowed)

## Tech
- React function components and hooks
- Stateless `Card` component via props
- Vite build tooling

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build

## GitHub
Repository: `https://github.com/Michael-Thompson-code/assignment3-cards`.
After cloning:
```bash
npm install
npm run dev
```

## Getting Started
1. Install Node.js 18+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173`.

## Project Structure
```
.
├── index.html
├── package.json
├── vite.config.js
├── src
│   ├── App.jsx
│   ├── main.jsx
│   ├── components
│   │   └── Card.jsx
│   └── styles.css
└── README.md
```

## Notes
- The `Card` component has no internal state; all logic is in `App` using hooks.
- Wildcards are generated with unique IDs and do not return to the deck.

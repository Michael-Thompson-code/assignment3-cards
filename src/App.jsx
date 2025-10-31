import React, { useMemo, useState } from 'react';
import Card from './components/Card.jsx';
import { SUITS, VALUES, generateStandardDeck, getRandomInt } from './utils/cards.js';

export default function App() {
  const fullDeck = useMemo(() => generateStandardDeck(), []);
  const [deck, setDeck] = useState(fullDeck);
  const [hand, setHand] = useState([]);

  const deckEmpty = deck.length === 0;

  function drawOne() {
    if (deckEmpty) return;
    const idx = getRandomInt(deck.length);
    const card = deck[idx];
    const nextDeck = deck.slice();
    nextDeck.splice(idx, 1);
    setDeck(nextDeck);
    setHand([...hand, card]);
  }

  return (
    <div className="app">
      <header>
        <h1>Deck of Cards</h1>
      </header>
      <main>
        <section className="controls">
          <button
            className={`deck ${deckEmpty ? 'deck-empty' : ''}`}
            onClick={drawOne}
            disabled={deckEmpty}
          >
            {deckEmpty ? 'no cards remaining' : 'Deck'}
          </button>
        </section>
        <section className="hand">
          {hand.map((c) => (
            <Card
              key={c.id}
              value={c.value}
              suit={c.suit}
              isPicked={false}
              onClick={() => {}}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

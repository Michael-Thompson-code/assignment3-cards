import React, { useMemo, useState } from 'react';
import Card from './components/Card.jsx';
import { SUITS, VALUES, generateStandardDeck, getRandomInt } from './utils/cards.js';

export default function App() {
  const fullDeck = useMemo(() => generateStandardDeck(), []);
  const [deck, setDeck] = useState(fullDeck);
  const [hand, setHand] = useState([]);
  const [pickedIndex, setPickedIndex] = useState(null);

  const deckEmpty = deck.length === 0;
  const remaining = deck.length;

  function resetAll() {
    setDeck(fullDeck);
    setHand([]);
    setPickedIndex(null);
  }

  function drawOne() {
    if (deckEmpty) return;
    const idx = getRandomInt(deck.length);
    const card = deck[idx];
    const nextDeck = deck.slice();
    nextDeck.splice(idx, 1);
    setDeck(nextDeck);
    setHand([...hand, card]);
  }

  function deal(n) {
    // Return all cards in hand back to deck first
    const returnedDeck = [...deck, ...hand];
    let nextDeck = returnedDeck.slice();
    const nextHand = [];
    for (let i = 0; i < n && nextDeck.length > 0; i += 1) {
      const idx = getRandomInt(nextDeck.length);
      nextHand.push(nextDeck[idx]);
      nextDeck.splice(idx, 1);
    }
    setDeck(nextDeck);
    setHand(nextHand);
    setPickedIndex(null);
  }

  function onCardClick(index) {
    if (pickedIndex === null) {
      setPickedIndex(index);
      return;
    }
    if (pickedIndex === index) {
      setPickedIndex(null);
      return;
    }
    // swap
    const next = hand.slice();
    const tmp = next[pickedIndex];
    next[pickedIndex] = next[index];
    next[index] = tmp;
    setHand(next);
    setPickedIndex(null);
  }

  function tossPicked() {
    if (pickedIndex === null) return;
    const next = hand.slice();
    next.splice(pickedIndex, 1);
    setHand(next);
    setPickedIndex(null);
  }

  function regroup() {
    const arr = hand.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = getRandomInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setHand(arr);
    setPickedIndex(null);
  }

  function wildcard() {
    const suit = SUITS[getRandomInt(SUITS.length)];
    const value = VALUES[getRandomInt(VALUES.length)];
    const id = `${value}${suit}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setHand([...hand, { id, value, suit }]);
  }

  const deckFace = (
    <button
      className={`deck ${deckEmpty ? 'deck-empty' : ''}`}
      onClick={drawOne}
      disabled={deckEmpty}
      aria-label={deckEmpty ? 'No cards remaining' : 'Draw a card'}
      title={deckEmpty ? 'No cards remaining' : `Draw a card (${remaining} left)`}
    >
      {deckEmpty ? 'no cards remaining' : (
        <>
          <span className="deck-count" aria-hidden>{remaining}</span>
          <span className="sr-only" aria-live="polite">{remaining} cards remaining</span>
        </>
      )}
    </button>
  );

  return (
    <div className="app">
      <header>
        <h1>Deck of Cards</h1>
      </header>
      <main>
        <section className="controls">
          {deckFace}
          <div className="buttons">
            <button onClick={() => deal(5)} title="Deal five new cards">Deal 5</button>
            <button onClick={() => deal(7)} title="Deal seven new cards">Deal 7</button>
            <button onClick={resetAll} title="Reset deck and clear hand">Reset</button>
            <button onClick={tossPicked} disabled={pickedIndex === null} title={pickedIndex === null ? 'Pick a card to toss' : 'Toss picked card'}>Toss</button>
            <button onClick={wildcard} title="Add a random wildcard">Wildcard</button>
            <button onClick={regroup} disabled={hand.length < 2} title={hand.length < 2 ? 'Need at least 2 cards' : 'Shuffle current hand'}>Regroup</button>
          </div>
        </section>
        <section className="hand" aria-label="Selected cards">
          {hand.map((c, index) => (
            <Card
              key={c.id}
              value={c.value}
              suit={c.suit}
              isPicked={pickedIndex === index}
              onClick={() => onCardClick(index)}
            />
          ))}
        </section>
      </main>
      <footer>
        <small>React + Hooks • Stateless Card component</small>
      </footer>
    </div>
  );
}



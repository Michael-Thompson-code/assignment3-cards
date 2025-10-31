import React from 'react';

export default function Card({ value, suit, isPicked, onClick }) {
  const suitColor = suit === '♥' || suit === '♦' ? 'red' : 'black';
  const classes = ['card'];
  if (isPicked) classes.push('picked');

  return (
    <button
      className={classes.join(' ')}
      style={{ color: suitColor }}
      onClick={onClick}
      aria-pressed={isPicked}
    >
      <span className="corner tl">{value}{suit}</span>
      <span className="center" aria-label={`${value} of ${suit}`}>{suit}</span>
      <span className="corner br">{value}{suit}</span>
    </button>
  );
}



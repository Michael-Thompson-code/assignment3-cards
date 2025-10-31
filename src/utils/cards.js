export const SUITS = ['♥', '♦', '♣', '♠'];
export const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function generateStandardDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ id: `${value}${suit}`, value, suit });
    }
  }
  return deck;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



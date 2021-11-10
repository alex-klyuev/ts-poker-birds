import { Card } from '../../types';

// takes in a card object, and returns a string that maps to card svgs
export const stringifyCard = (card: Card): string => {
  const num = card.num.toString();
  switch (num) {
    case '11':
      return `J${card.suit}`;
    case '12':
      return `Q${card.suit}`;
    case '13':
      return `K${card.suit}`;
    case '14':
      return `A${card.suit}`;
    default:
      return num + card.suit;
  }
};

import { PokerGame } from '../../classes';
import { Card } from '../../types';

// Creates a new full deck
export const buildDeck = (PG: PokerGame): void => {
  PG.deckArray = [];
  for (let i = 0; i < 13; i++) {
    const spadesI: Card = {
      num: i + 2,
      suit: 'S'
    };
    const clubsI: Card = {
      num: i + 2,
      suit: 'C'
    };
    const diamondI: Card = {
      num: i + 2,
      suit: 'D'
    };
    const heartI: Card = {
      num: i + 2,
      suit: 'H'
    };
    PG.deckArray.push(spadesI, clubsI, diamondI, heartI);
  }
};

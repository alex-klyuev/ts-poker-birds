import { PokerGame } from '../../classes';
import { randDeckArrayIdx } from './helper';

// takes a card out of the deck and adds it to the board next opening.
// will need to be called 3 times for the flop, once for turn and once for river.
export const addToBoard = (PG: PokerGame): void => {
  const randInt = randDeckArrayIdx(PG);
  const { board, deckArray } = PG;
  const { index } = board;
  board.cards[index] = deckArray[randInt];
  deckArray.splice(randInt, 1);
  board.iterateIndex();
};

export const flop = (PG: PokerGame): void => {
  addToBoard(PG);
  addToBoard(PG);
  addToBoard(PG);
};

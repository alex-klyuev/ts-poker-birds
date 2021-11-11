import { PokerGame } from '../../classes';
import { incrementTurn } from './incrementTurn';

// this function finds the next player that's still in the game and increments the turn to them
export const findNextPlayer = (PG: PokerGame): void => {
  // iterates starting from the current turn until it finds the next player that hasn't folded
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    if (!PG.playerObjectArray[PG.turn].inGame) {
      incrementTurn(PG);
    } else {
      break;
    }
  }
};

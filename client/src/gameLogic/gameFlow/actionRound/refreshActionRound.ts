import { PokerGame } from '../../classes';
import { incrementTurn, findNextPlayer } from '../../functions';

// this function restarts the following action round
export const refreshActionRound = (PG: PokerGame): void => {
  // clear pot commitment and action states; cards remain the same; reset PG.minraise
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    PG.playerObjectArray[i].potCommitment = 0;
    PG.playerObjectArray[i].actionState = '';
  }
  PG.previousBet = 0;
  PG.minRaise = PG.bigBlind;

  // action in remaining three rounds begins with the small blind
  PG.turn = PG.dealer;
  incrementTurn(PG);
  findNextPlayer(PG);

  // hacky way of setting players to still be in the action round so that the ending condition
  // functions don't immediately read the turn as over at the beginning of the round (could probably
  // be improved to be more clear). Still a blank string so that nothing is output to the board
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    if (PG.playerObjectArray[i].inGame) {
      PG.playerObjectArray[i].actionState = ' ';
    }
  }

  // allow checking at beginning of round
  PG.allowCheck = true;

  // unnecessary for react:
  // outputGameStatus(PG);
  // outputPlayerInquiry(PG);
};

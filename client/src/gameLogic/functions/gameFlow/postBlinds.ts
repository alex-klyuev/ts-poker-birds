import { PokerGame } from '../../classes';
import { incrementTurn } from './incrementTurn';

export const postBlinds = (PG: PokerGame): void => {
  // post small blind
  PG.minRaise = 0;
  PG.previousBet = 0;
  PG.playerObjectArray[PG.turn].raise(PG.smallBlind, PG);
  PG.playerObjectArray[PG.turn].actionState = 'SB';
  incrementTurn(PG);

  // post big blind; vars are set to 0 to allow a raise (so that later bb can check at the end of pre-flop)
  PG.minRaise = 0;
  PG.previousBet = 0;
  PG.playerObjectArray[PG.turn].raise(PG.bigBlind, PG);
  PG.playerObjectArray[PG.turn].actionState = 'BB';
  incrementTurn(PG);
  PG.minRaise = PG.bigBlind;
  PG.previousBet = PG.bigBlind;
  PG.allowCheck = false;
};

import { PokerGame } from '../../classes';

// increments turn so that it can loop around the table
export const incrementTurn = (PG: PokerGame): void => {
  PG.turn += 1;
  PG.turn %= PG.playerObjectArray.length;

  // TO-DO: fix the message box
  // eslint-disable-next-line max-len
  // PG.message = `Player ${PG.playerObjectArray[PG.dealer].ID} is the dealer\nPlayer ${PG.playerObjectArray[PG.turn].ID}, it's your turn`;
};

import { PokerGame } from '../../classes';
import { buildDeck,
  dealCards,
  incrementTurn,
  postBlinds
} from '../../functions';
import { ActionState } from '../../types';

// this function restarts the following dealer round
export const refreshDealerRound = (PG: PokerGame): void => {
  // refresh all these variables.
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    PG.playerObjectArray[i].potCommitment = 0;
    PG.playerObjectArray[i].actionState = ActionState.NoAction;
    PG.playerObjectArray[i].cards = [];
    PG.playerObjectArray[i].inGame = true;

    // If a player lost their money, they stay out;
    // buy back or leave table functionality not included

    // DOUBLE CHECK THIS when showdown and side-pot parts are developed
    if (PG.playerObjectArray[i].stack === 0) {
      PG.playerObjectArray[i].inGame = false;
    }
  }

  // increment dealer
  PG.dealer += 1;
  PG.dealer %= PG.playerObjectArray.length;

  // clear the board, build a new full deck, and deal cards to the players
  PG.board.cards = [];
  buildDeck(PG);
  dealCards(PG);

  // set turn to small blind, next after dealer
  PG.turn = PG.dealer;
  incrementTurn(PG);

  // post blinds
  postBlinds(PG);

  // edge case scenario where there are only 2 players and sb = bb,
  // first player to act is sb. this allows them to check
  if (PG.playerObjectArray[PG.turn].actionState === ActionState.SmallBlind && PG.smallBlind === PG.bigBlind) {
    PG.allowCheck = true;
  }

  // declare the dealer, output the first game board, and announce the first turn
  PG.message += `\nPlayer ${PG.playerObjectArray[PG.dealer].ID} is the dealer\nPlayer ${PG.playerObjectArray[PG.turn].ID}, it's your turn`;
};

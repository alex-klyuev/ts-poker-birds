import { PokerGame } from '../../classes';
import { convertToDollars } from '../../functions';

// this function will end the dealer round when everyone except one person has folded.
// That person will win the pot. This is one of two ways a dealer round can end;
// the other is with a showdown, which has its own function.
export const checkDealerRoundEndingCondition = (PG: PokerGame): boolean => {
  let dealerCounter = 0;
  let winnerIndex = -1;
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    if (PG.playerObjectArray[i].actionState === 'fold' || PG.playerObjectArray[i].actionState === '') {
      dealerCounter += 1;
    } else {
      winnerIndex = i;
    }
  }

  if (dealerCounter === PG.playerObjectArray.length - 1) {
    // move pot to winner's stack
    PG.playerObjectArray[winnerIndex].stack += PG.pot;
    PG.message = `Player ${PG.playerObjectArray[winnerIndex].ID} wins $${convertToDollars(PG.pot)}`;
    PG.pot = 0;
    return true;
  }

  // dealer round didn't end
  return false;
};
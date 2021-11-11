import { PokerGame } from '../../classes';

// Action round ending conditions fall into two categories:
//  1. "No-raise": where there has been no raise and everyone checks or folds,
//  or in the case of the pre-flop, calls, checks, or folds.
//  2. "Raise": where there is one remaining raiser and everyone else behind calls or folds.
export const checkActionRoundEndingCondition = (PG: PokerGame): boolean => {
  let actionCounter1 = 0;
  let actionCounter2 = 0;
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    // handles both pre-flop and post-flop "no raise" situations
    if (PG.playerObjectArray[i].actionState === 'call' || PG.playerObjectArray[i].actionState === 'fold'
      || PG.playerObjectArray[i].actionState === 'check' || PG.playerObjectArray[i].actionState === '') {
      actionCounter1 += 1;
    }

    // JJ-COMMENT: if else instead of two if statements?

    // handles "raise" situations
    if (PG.playerObjectArray[i].actionState === 'call' || PG.playerObjectArray[i].actionState === 'fold'
      || PG.playerObjectArray[i].actionState === '') {
      actionCounter2 += 1;
    }
  }

  // can be combined later
  // no-raise scenario
  if (actionCounter1 === PG.playerObjectArray.length) {
    console.log('action round ended via no-raise scenario'); // free cards smh cod clam it
    return true;
  }

  // raise scenario
  if (actionCounter2 === PG.playerObjectArray.length - 1 && PG.playerObjectArray[PG.turn].actionState === 'raise') {
    console.log('action round ended via raise scenario'); // no free cards baby!
    return true;
  }

  // action round ending conditions not met
  return false;
};

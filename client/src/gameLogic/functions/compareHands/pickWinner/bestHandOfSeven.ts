import { Card, Hand, PlayerRank } from '../../../types';
import { mapHandToRank } from '../mapHandToRank';
import { pickBestHandRank } from './pickBestHandRank';

// In poker, you pick the best 5 hand combination that you can make out of 7 cards:
// your 2 hole cards + the shared 5 cards (the 'board')
// bestHandRank takes the 7 cards a player has and returns the rank
// of the best 5-card hand they can make

// combine helper function makes n choose k combinations of an input array of length n
// and generates arrays of length k that constitute all combinations of the input
// array elements and returns an array of all those arrays. It's n choose k
const combine = (inputArray: Array<Card>, k: number, start: number): Array<Hand> => {
  const currentCombination: Array<Card> = [];
  const pl = k;
  currentCombination.length = pl;
  const handCombinations: Array<Hand> = [];

  if (k === 0) {
    handCombinations.push(currentCombination.slice() as Hand);
    return handCombinations;
  }

  for (let i = start; i <= inputArray.length - k; i++) {
    currentCombination[pl - k] = inputArray[i];
    combine(inputArray, k - 1, i + 1);
  }

  return handCombinations;
};

export const bestHandOfSeven = (sevenCards: Array<Card>): PlayerRank => {
  // generate 21 combinations of 5-card hands from the 7 input cards
  const handCombinations: Array<Hand> = combine(sevenCards, 5, 0);

  // iterate through each hand combination to return its rank, then push the
  // handRank array to handRanks
  const handRanks: Array<PlayerRank> = [];
  for (let i = 0; i < handCombinations.length; i += 1) {
    const handRank: PlayerRank = {
      rank: mapHandToRank(handCombinations[i])
    };
    handRanks.push(handRank);
  }

  // return the rank of the best hand of the 21 possibilities
  // This rank is a player's best hand that they can make in a showdown.
  // This rank is compared to the other players' best hand rank
  return pickBestHandRank(handRanks);
};

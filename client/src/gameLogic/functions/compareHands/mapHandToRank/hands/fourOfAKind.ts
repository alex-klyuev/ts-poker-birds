import { HandToRankMap, FreqMap } from '../../../../types';
import { makeFreqMap } from './helper';

// Ranking system:
// [7, four-of-a-kind-value, kicker, 0, 0, 0]

interface RankObj {
  fourOfAKindVal?: number;
  kicker?: number;
}

export const fourOfAKind: HandToRankMap = (hand) => {
  const freqMap: FreqMap = makeFreqMap(hand);

  // make a specific object for the value of the 4 and the kicker
  const rankObj: RankObj = {};
  for (const num in freqMap) {
    if (freqMap[num] === 4) {
      rankObj.fourOfAKindVal = parseInt(num);
    } else {
      rankObj.kicker = parseInt(num);
    }
  }

  // check if there is four of a kind and return rank array
  if (rankObj.fourOfAKindVal === undefined) {
    return null;
  }
  return [7, rankObj.fourOfAKindVal, rankObj.kicker as number, 0, 0, 0];
};

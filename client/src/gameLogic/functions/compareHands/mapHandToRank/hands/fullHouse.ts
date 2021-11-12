import { HandToRankMap, FreqMap } from '../../../../types';
import { makeFreqMap } from './helper';

// Ranking system:
// [6, three-of-a-kind-value, pair-value, 0, 0, 0]

interface RankObj {
  threeOfAKindVal?: number;
  pairVal?: number;
}

export const fullHouse: HandToRankMap = (hand) => {
  const freqMap: FreqMap = makeFreqMap(hand);

  // make a specific object for value of the 3 and the pair
  const rankObj: RankObj = {};
  for (const num in freqMap) {
    if (freqMap[num] === 3) {
      rankObj.threeOfAKindVal = parseInt(num);
    }
    if (freqMap[num] === 2) {
      rankObj.pairVal = parseInt(num);
    }
  }

  // check if there is a full house and return rank array
  if (rankObj.threeOfAKindVal === undefined || rankObj.pairVal === undefined) {
    return null;
  }
  return [6, rankObj.threeOfAKindVal, rankObj.pairVal, 0, 0, 0];
};

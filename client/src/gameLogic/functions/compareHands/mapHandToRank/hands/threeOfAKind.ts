import { HandToRankMap, FreqMap } from '../../../../types';
import { makeFreqMap } from './helper';

// Ranking system:
// [3, three-of-a-kind-value, high-kicker, 2nd-highest-kicker, 0, 0]

type KickerArray = [number, number];

interface RankObj {
  threeOfAKindVal?: number;
  kickerArray?: number[];
}

export const threeOfAKind: HandToRankMap = (hand) => {
  const freqMap: FreqMap = makeFreqMap(hand);

  // make a specific object for value of the 3
  const rankObj: RankObj = {};
  for (const num in freqMap) {
    if (freqMap[num] === 3) {
      rankObj.threeOfAKindVal = parseInt(num);
    }
  }

  // create an array for the kickers and add them in (this allows
  // them to stay ordered from highest to lowest)
  rankObj.kickerArray = [];
  for (let i = 0; i < 5; i++) {
    if (hand[i].num !== rankObj.threeOfAKindVal) {
      rankObj.kickerArray.push(hand[i].num);
    }
  }

  // check if there is a 3 of a kind and return rank array
  if (rankObj.threeOfAKindVal === undefined) {
    return null;
  }
  return [3, rankObj.threeOfAKindVal as number, ...rankObj.kickerArray as KickerArray, 0, 0];
};

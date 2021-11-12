import { HandToRankMap, FreqMap } from '../../../../types';
import { makeFreqMap } from './helper';

// Ranking system:
// [2, high-pair-value, low-pair-value, kicker, 0, 0]

type PairValArray = [number, number];

interface RankObj {
  pairValArray: number[];
  kicker?: number;
}

export const twoPair: HandToRankMap = (hand) => {
  const freqMap: FreqMap = makeFreqMap(hand);

  // make a specific object for the values of both pairs (in an array
  // to be sorted later) and the kicker
  const rankObj: RankObj = {
    pairValArray: [],
  };
  let pairCounter = 0;
  for (const num in freqMap) {
    if (freqMap[num] === 2) {
      rankObj.pairValArray.push(parseInt(num));
      pairCounter++;
    } else {
      rankObj.kicker = parseInt(num);
    }
  }

  // check if there is a two-pair, sort the pair values, and return rank array
  if (pairCounter !== 2) {
    return null;
  }
  rankObj.pairValArray.sort((a, b) => b - a);
  return [2, ...rankObj.pairValArray as PairValArray, rankObj.kicker as number, 0, 0];
};

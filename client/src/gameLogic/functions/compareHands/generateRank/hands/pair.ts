import { HandToRankMap } from '../../../../types';
import { makeFreqMap } from './helper';

// Ranking system:
// [1, pair-value, high-card, ... , 3rd-highest-card, 0]

type KickerArray = [number, number, number];

interface RankObj {
  pairVal?: number;
  // hacky way to allow initializing it as an empty array
  kickerArray?: number[];
}

export const pair: HandToRankMap = (hand) => {
  const freqMap = makeFreqMap(hand);

  // make a specific object for value of the pair
  const rankObj: RankObj = {};
  for (const num in freqMap) {
    if (freqMap[num] === 2) {
      rankObj.pairVal = parseInt(num);
    }
  }

  // create an array for the kickers and add them in (this allows
  // them to stay ordered from highest to lowest)
  rankObj.kickerArray = [];
  for (let i = 0; i < 5; i++) {
    if (hand[i].num !== rankObj.pairVal) {
      rankObj.kickerArray.push(hand[i].num);
    }
  }

  // check if there is a pair and return rank array
  if (rankObj.pairVal === undefined) {
    return null;
  }
  return [1, rankObj.pairVal, ...rankObj.kickerArray as KickerArray, 0];
};
import { Hand, FreqMap } from '../../../../../types';

// for a given hand, maps the number of each card to the frequency it appears in the hand
// e.g., TT88K -> { 10: 2, 8: 2, 12: 1 }
export const makeFreqMap = (hand: Hand): FreqMap => {
  const freqMap: FreqMap = {};
  for (let i = 0; i < 5; i++) {
    const { num } = hand[i];
    if (freqMap[num] === undefined) {
      freqMap[num] = 0;
    }
    freqMap[num]++;
  }
  return freqMap;
};

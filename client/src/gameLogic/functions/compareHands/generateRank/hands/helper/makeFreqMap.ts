import { Hand, FrequencyMap } from '../../../../../types';

// maps the number of a card to the frequency it appears in the hand
export const makeFreqMap = (hand: Hand): FrequencyMap => {
  const freqMap: FrequencyMap = {};
  for (let i = 0; i < 5; i++) {
    const { num } = hand[i];
    if (freqMap[num] === undefined) {
      freqMap[num] = 0;
    }
    freqMap[num]++;
  }
  return freqMap;
};

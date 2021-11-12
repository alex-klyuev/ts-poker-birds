import { Rank } from '../../../types';

// given an arbitrary-length array of 5-card hand ranks,
// returns the rank of the best hand
export const pickBestHand = (handRanks: Array<Rank>): Rank => {
  // sort the hand ranks and return the best one
  handRanks.sort((rank1, rank2) => {
    for (let i = 0; i < rank1.length; i++) {
      if (rank2[i] !== rank1[i]) {
        return rank2[i] - rank1[i];
      }
    }
    return 0;
  });
  return handRanks[0];
};

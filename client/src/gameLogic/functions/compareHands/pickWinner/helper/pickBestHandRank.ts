import { PlayerRank } from '../../../../types';

// given an arbitrary-length array of 5-card hand ranks,
// returns the rank of the best hand

// this function returns a PlayerRank object that has an optional player index property
// this is because this function is used in two places:
// 1. find the best hand an individual player can make (player index is not needed)
// 2. find the best hand between 2 or more players (player index is needed)
export const pickBestHandRank = (handRanks: Array<PlayerRank>): PlayerRank => {
  // sort the hand ranks and return the best one
  handRanks.sort((playerRank1, playerRank2) => {
    const { rank: rank1 } = playerRank1;
    console.log(playerRank1);
    const { rank: rank2 } = playerRank2;

    for (let i = 0; i < rank1.length; i++) {
      if (rank2[i] !== rank1[i]) {
        return rank2[i] - rank1[i];
      }
    }
    return 0;
  });
  return handRanks[0];
};

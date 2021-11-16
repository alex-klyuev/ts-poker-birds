import { Rank } from './Rank';

// object to tie a player's rank to their index in the player object array
// during the showdown comparison
export interface PlayerRank {
  rank: Rank;
  playerIndex?: number;
}

import { Hand } from './Hand';
import { Rank } from './Rank';

// null is returned for hand class functions that don't match
// (e.g., when threeOfAKind runs on a hand with 2-pair)
export type HandToRankMap = (hand: Hand) => Rank | null;

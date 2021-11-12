import { Hand, Rank } from '../../../types';
import {
  highCard,
  pair,
  twoPair,
  threeOfAKind,
  straight,
  flush,
  fullHouse,
  fourOfAKind,
  straightFlush
} from './hands';

/**
 * In poker, 6 numbers are required to identify the rank of any combination of 5 cards
 * This allows hands to be compared to determine which is the highest
 * (or in some cases a tie).
 *
 * The first digit designates the class of hand:
 *   8 - straight flush
 *   7 - four of a kind
 *   6 - full house
 *   5 - flush
 *   4 - straight
 *   3 - 3 of a kind
 *   2 - two pair
 *   1 - pair
 *   0 - high card
 *
 * Each hand has a nested ranking system that is described in the function
 * associated with that hand class
 *
 * Example: We know that a 2 pair beats a pair and a high card, and is beaten by any of
 * the hands described from 3 - 8. But if 2 or more players both have 2 pair,
 * we first compare the high pairs. If those are the same, we compare the lower
 * pairs. If those are the same, we must then compare the remaining 5th card.
 *
 * Cards that are not part of a pair / combination that determine a hand
 * are known as "kickers"
 *
 * If one player has KK88A and the other has KK889, their ranks are
 * [2, 12, 8, 13, 0] vs [2, 12, 8, 9, 0] which maps to
 * [hand-class (2-pair), high-pair-value, low-pair-value, kicker-value, N/A]
 * We iterate left to right until one has a higher rank, or a tie is found.
*/

// create an array of all the hand functions to iterate through in returnHandRank
// will break out of the function once a class of hand is found, so we iterate
// from high to low rank
const handFunctionsArray = [straightFlush, fourOfAKind, fullHouse, flush, straight,
  threeOfAKind, twoPair, pair, highCard];

// This function will return the rank of any 5-card hand combination
// We don't use HandToRankMap as a type here because we know it won't
// return null
export const mapHandToRank = (hand: Hand): Rank => {
  // sort hand by number rank from greatest to lowest
  // giving the helper functions a sorted hand simplifies them
  hand.sort((card1, card2) => card2.num - card1.num);

  // iterate through the handFunctionsArray and return the hand rank found
  for (let i = 0; i < handFunctionsArray.length; i += 1) {
    const handRank = handFunctionsArray[i](hand) as Rank;
    if (handRank !== null) {
      return handRank;
    }
  }

  // to make TS happy, will never hit this
  // what's the proper method for designating the return type on a function
  // like this where you know it will never return undefined?
  return {} as Rank;
};

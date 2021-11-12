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
 * If one player has KK88A and the other has KK889, their ranks are
 * [2, 12, 8, 13, 0] vs [2, 12, 8, 9, 0] which maps to
 * [hand-class (2-pair), high-pair-value, low-pair-value, high-card-value, N/A]
 * We iterate left to right until one has a higher rank, or a tie is found.
*/

export type Rank = [number, number, number, number, number, number];

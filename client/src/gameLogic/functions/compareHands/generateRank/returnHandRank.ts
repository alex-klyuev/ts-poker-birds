/**
 * This function takes any five card hand and returns a unique rank array that can
 * compared to any other hand's rank array to determine which is better (or equal)
 * ranking system:
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
 * Each hand will have a further ranking system within
*/

// create an array of all the hand functions to iterate through in returnHandRank
const handFunctionsArray = [straightFlush, fourOfAKind, fullHouse, flush, straight,
  threeOfAKind, twoPair, pair, highCard];

const returnHandRank = (hand) => {
  // sort hand by number rank from greatest to lowest
  hand.sort((card1, card2) => card2.num - card1.num);

  // iterate through the handFunctionsArray and return the hand
  for (let i = 0; i < handFunctionsArray.length; i += 1) {
    const handRank = handFunctionsArray[i](hand);
    if (handRank !== null) {
      return handRank;
    }
  }
};
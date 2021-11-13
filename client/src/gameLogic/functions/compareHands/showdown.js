import { PokerGame } from '../../classes';

export const showdown = (PG: PokerGame) => {
  const showdownHandRanks = [];
  for (let i = 0; i < PG.playerObjectArray.length; i++) {
    // for the players that remain, add a new object property consisting of that player's seven showdown cards
    if (PG.playerObjectArray[i].inGame) {
      const sevenCards = [...PG.board.cards, ...PG.playerObjectArray[i].cards];

      // this function takes the player's seven showdown cards, and returns
      // the rank of the best five-hand card
      PG.playerObjectArray[i].showdownRank = bestHandRank(sevenCards);
      PG.playerObjectArray[i].showdownRank.playerIndex = i;
      showdownHandRanks.push(PG.playerObjectArray[i].showdownRank);
    }
  }

  // returns the best hand rank and its player index
  return pickBestHand(showdownHandRanks);
};

const bestHandRank = (sevenCards) => {
  const currentCombination = [];
  currentCombination.length = 5;
  const handCombinations = [];

  // this function makes n choose k combinations of an input array of length n
  // and generates arrays of length k that constitute all combinations of the input
  // array elements and returns an array of all those arrays. it's n choose k
  const combine = (inputArray, k, start) => {
    if (k === 0) {
      handCombinations.push(currentCombination.slice());
      return;
    }

    for (let i = start; i <= inputArray.length - k; i++) {
      currentCombination[5 - k] = inputArray[i];
      combine(inputArray, k - 1, i + 1);
    }
  };

  combine(sevenCards, 5, 0);

  // iterate through each hand combination to return its rank, then push the
  // handRank array to handRanks
  const handRanks = [];
  for (let i = 0; i < handCombinations.length; i += 1) {
    const handRank = returnHandRank(handCombinations[i]);
    handRanks.push(handRank);
  }

  return pickBestHand(handRanks);
};

const pickBestHand = (handRanks) => {
  // sort the hand ranks and return the best one
  handRanks.sort((rank1, rank2) => {
    for (let i = 0; i < rank1.length; i++) {
      if (rank2[i] - rank1[i] !== 0) {
        return rank2[i] - rank1[i];
      }
    }
  });
  return handRanks[0];
};

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

const returnHandRank = (hand) => {
  // sort hand by number rank from greatest to lowest
  hand.sort((card1, card2) => card2.num - card1.num);

  // iterate through the handFunctionsArray and return the hand
  for (let i = 0; i < handFunctionsArray.length; i += 1) {
    const handRank = handFunctionsArray[i](hand);
    if (handRank !== null) {
      console.log(handRank);
      return handRank;
    }
  }
};

const straightFlush = (hand) => {
  // check for flush; if not, function is broken immediately
  for (let i = 1; i <= 4; i += 1) {
    if (hand[i].suit !== hand[0].suit) {
      return null;
    }
  }

  // check for wheel straight (A -> 5)
  let wheelCounter = 0;
  if (hand[0].num === 14) {
    for (let i = 1; i <= 4; i += 1) {
      if (hand[i].num === 6 - i) {
        wheelCounter += 1;
      }
    }
  }

  // if it's a wheel, return the rank
  if (wheelCounter === 4) {
    // 5 is the high card in a wheel
    return [8, 5, 0, 0, 0, 0];
  }

  // check for remaining straights
  for (let i = 1; i <= 4; i++) {
    if (hand[i].num !== hand[0].num - i) {
      return null;
    }
  }

  // return SF with high card
  return [8, hand[0].num, 0, 0, 0, 0];
};

const fourOfAKind = (hand) => {
  const freqMap = makeFreqMap(hand);

  // make a specific object for the value of the 4 and the kicker
  const rankObj = {};
  for (const num in freqMap) {
    if (freqMap[num] === 4) {
      rankObj.fourVal = parseInt(num);
    } else {
      rankObj.kicker = parseInt(num);
    }
  }

  // check if there is four of a kind and return rank array
  if (rankObj.fourVal === undefined) {
    return null;
  }
  return [7, rankObj.fourVal, rankObj.kicker, 0, 0, 0];
};

const fullHouse = (hand) => {
  const freqMap = makeFreqMap(hand);

  // make a specific object for value of the 3 and the pair
  const rankObj = {};
  for (const num in freqMap) {
    if (freqMap[num] === 3) {
      rankObj.threeVal = parseInt(num);
    }
    if (freqMap[num] === 2) {
      rankObj.twoVal = parseInt(num);
    }
  }

  // check if there is a full house and return rank array
  if (rankObj.threeVal === undefined || rankObj.twoVal === undefined) {
    return null;
  }
  return [6, rankObj.threeVal, rankObj.twoVal, 0, 0, 0];
};

const flush = (hand) => {
  for (let i = 1; i <= 4; i++) {
    if (hand[i].suit !== hand[0].suit) {
      return null;
    }
  }

  // all 5 flush cards need to be ranked
  const flushArray = [];
  for (let i = 0; i < 5; i++) {
    flushArray.push(hand[i].num);
  }
  return [5, ...flushArray];
};

const straight = (hand) => {
  // check for wheel (see straight flush for explanation)
  let wheelCounter = 0;
  if (hand[0].num === 14) {
    for (let i = 1; i <= 4; i++) {
      if (hand[i].num === 6 - i) {
        wheelCounter++;
      }
    }
  }
  if (wheelCounter === 4) {
    return [4, 5, 0, 0, 0, 0];
  }

  // check for remaining straights
  for (let i = 1; i <= 4; i++) {
    if (hand[i].num !== hand[0].num - i) {
      return null;
    }
  }
  return [4, hand[0].num, 0, 0, 0, 0];
};

const threeOfAKind = (hand) => {
  const freqMap = makeFreqMap(hand);

  // make a specific object for value of the 3
  const rankObj = {};
  for (const num in freqMap) {
    if (freqMap[num] === 3) {
      rankObj.threeVal = parseInt(num);
    }
  }

  // create an array for the kickers and add them in (this allows
  // them to stay ordered from highest to lowest)
  rankObj.kickerArray = [];
  for (let i = 0; i < 5; i++) {
    if (hand[i].num !== rankObj.threeVal) {
      rankObj.kickerArray.push(hand[i].num);
    }
  }

  // check if there is a 3 of a kind and return rank array
  if (rankObj.threeVal === undefined) {
    return null;
  }
  return [3, rankObj.threeVal, ...rankObj.kickerArray, 0, 0];
};

const twoPair = (hand) => {
  const freqMap = makeFreqMap(hand);

  // make a specific object for the values of both pairs (in an array
  // to be sorted later) and the kicker
  const rankObj = {
    pairValArray: [],
  };
  let pairCounter = 0;
  for (const num in freqMap) {
    if (freqMap[num] === 2) {
      rankObj.pairValArray.push(parseInt(num));
      pairCounter++;
    } else {
      rankObj.kicker = parseInt(num);
    }
  }

  // check if there is a two-pair, sort the pair values, and return rank array
  if (pairCounter !== 2) {
    return null;
  }
  rankObj.pairValArray.sort((a, b) => b - a);
  return [2, ...rankObj.pairValArray, rankObj.kicker, 0, 0];
};

const pair = (hand) => {
  const freqMap = makeFreqMap(hand);

  // make a specific object for value of the pair
  const rankObj = {};
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
  return [1, rankObj.pairVal, ...rankObj.kickerArray, 0];
};

const highCard = (hand) => {
  const highCardArray = [];
  for (let i = 0; i < 5; i++) {
    highCardArray.push(hand[i].num);
  }
  return [0, ...highCardArray];
};

// create an array of all the hand functions to iterate through in returnHandRank
const handFunctionsArray = [straightFlush, fourOfAKind, fullHouse, flush, straight,
  threeOfAKind, twoPair, pair, highCard];

// make an object where each card number is the key, and the amount of times
// that card number appears in the hand is that key's value
const makeFreqMap = (hand) => {
  const freqMap = {};
  for (let i = 0; i < 5; i++) {
    const num = hand[i].num;
    if (freqMap[num] === undefined) {
      freqMap[num] = 0;
    }
    freqMap[num]++;
  }
  return freqMap;
};

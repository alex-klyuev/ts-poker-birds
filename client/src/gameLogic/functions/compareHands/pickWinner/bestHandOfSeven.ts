// In poker, you pick the best 5 hand combination that you can make out of 7 cards:
// your 2 hole cards + the shared 5 cards (the 'board')
// This function takes the 7 cards a player has and returns the rank
// of the best 5-card hand they can make

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
// called on the first element of a Rank array
export const rankToHandStr = (rank: number): string => {
  switch (rank) {
    case 8:
      return 'Straight Flush';
    case 7:
      return 'Four of a Kind';
    case 6:
      return 'Full House';
    case 5:
      return 'Flush';
    case 4:
      return 'Straight';
    case 3:
      return 'Three of a Kind';
    case 2:
      return 'Two Pair';
    case 1:
      return 'Pair';
    default:
      return 'High Card';
  }
};

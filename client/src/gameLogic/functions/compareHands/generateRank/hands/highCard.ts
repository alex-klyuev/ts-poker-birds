import { HandToRankMap, Rank} from '../../../../types';

// Ranking system:
// [0, high-card, 2nd-highest card, ... , 5th-highest card]
export const highCard: HandToRankMap = (hand) => {
  const highCardArray = [];
  for (let i = 0; i < 5; i++) {
    // Hands are sorted before being fed to the ranking functions,
    // so we simply add the first 5
    highCardArray.push(hand[i].num);
  }
  return [0, ...highCardArray] as Rank;
};

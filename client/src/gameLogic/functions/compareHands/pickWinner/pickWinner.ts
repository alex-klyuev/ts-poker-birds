import { PokerGame } from '../../../classes';
import { Card, PlayerRank } from '../../../types';
import { bestHandOfSeven } from './bestHandOfSeven';
import { pickBestHandRank } from './pickBestHandRank';

export const showdown = (PG: PokerGame): PlayerRank => {
  const showdownHandRanks: Array<PlayerRank> = [];
  for (let i = 0; i < PG.playerObjectArray.length; i++) {
    // for the players that remain, add a new object property consisting of that player's seven showdown cards
    if (PG.playerObjectArray[i].inGame) {
      const sevenCards: Array<Card> = [...PG.board.cards, ...PG.playerObjectArray[i].cards];

      // this function takes the player's seven showdown cards, and returns
      // the rank of the best five-hand card
      // PG.playerObjectArray[i].showdownRank = bestHandOfSeven(sevenCards);
      // PG.playerObjectArray[i].showdownRank.playerIndex = i;

      const playerRank = {
        rank: bestHandOfSeven(sevenCards).rank,
        playerIndex: i
      }

      // showdownHandRanks.push(PG.playerObjectArray[i].showdownRank);
      showdownHandRanks.push(playerRank)
    }
  }

  // returns the best hand rank and its player index
  return pickBestHandRank(showdownHandRanks);
};
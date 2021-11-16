import { PokerGame, Player } from '../../classes';
import { randDeckArrayIdx } from './helper';

// this function assigns cards from the deck to players. Remaining deck is returned and player objects are
// updated accordingly. Only needs to run once at the beginning of each dealer round
export const dealCards = (PG: PokerGame): void => {
  PG.playerObjectArray.forEach((player: Player): void => {
    for (let i = 0; i < 2; i++) {
      const randInt = randDeckArrayIdx(PG);
      player.cards[i] = PG.deckArray[randInt];
      PG.deckArray.splice(randInt, 1);
    }
  });
};
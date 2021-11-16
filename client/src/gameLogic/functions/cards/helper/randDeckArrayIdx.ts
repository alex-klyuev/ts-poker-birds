import { PokerGame } from '../../../classes';
export const randDeckArrayIdx = (PG: PokerGame): number => Math.floor(Math.random() * PG.deckArray.length);

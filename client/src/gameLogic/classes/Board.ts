import { Card } from '../types/Card';

export class Board {
  cards: Array<Card>;
  // the index of the next open spot on the board
  index: number;

  constructor(cards: Array<Card>, index: number) {
    this.cards = cards;
    this.index = index;
  }

  iterateIndex(): void {
    const { index } = this;
    this.index = index === 4 ? 0 : index + 1;
  }
}

import { Card } from '../types/Card';

export class Board {
  cards: Array<Card>;
  // the index of the next open spot on the board
  index: number;

  constructor() {
    this.cards = [];
    this.index = 0;
  }

  iterateIndex(): void {
    const { index } = this;
    this.index = index === 4 ? 0 : index + 1;
    console.log(this.index);
  }
}

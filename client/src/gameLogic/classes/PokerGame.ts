// The Poker Game class contains all the information relevant to an instance of a game,
// including instances of Player classes associated with each player

import { Player } from './Player';
import { Board } from './Board';
import { Card } from '../types';

export class PokerGame {
  _id: number;
  gameUnderway: boolean;
  numPlayers: number;
  buyIn: number;
  smallBlind: number;
  bigBlind: number;
  playerObjectArray: Array<Player>;
  dealer: number;
  turn: number;
  pot: number;
  actionRoundState: number;
  board: Board;
  deckArray: Array<Card>;
  minRaise: number;
  previousBet: number;
  allowCheck: boolean;
  message: string;
  deckColor: string;

  constructor(gameId: number) {
    // CONSTANT GLOBAL VARIABLES --- they'll remain the same for the entire game once initialized
    this._id = gameId;
    this.gameUnderway = false;
    this.numPlayers = 0;
    this.buyIn = 0;
    this.smallBlind = 0;
    this.bigBlind = 0;
    // an array of instances of the Player class that corresponds to each player
    this.playerObjectArray = [];

    // GLOBAL VARIABLES --- vars such as dealer & turn that iterate
    // through arrays are based on array metrics (0-7)
    this.dealer = 0;
    this.turn = 0;
    this.pot = 0;
    this.actionRoundState = 0; // 0 = pre-flop, 1 = flop, 2 = turn, 3 = river
    this.board = new Board([], 0);
    this.deckArray = [];
    this.minRaise = 0;
    this.previousBet = 0;
    this.allowCheck = false;
    this.message = '';
    // pick a color for the game
    this.deckColor = Math.floor(Math.random() * 2) ? 'Blue' : 'Red';
  }
}

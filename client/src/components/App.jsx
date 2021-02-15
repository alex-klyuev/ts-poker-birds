// REMOVE THIS LATER:
/* eslint-disable react/no-unused-state */
// no styling for now...let's get the game functionality working

import React from 'react';
import StartUpForm from './StartUpForm';
import PlayerContainer from './PlayerContainer';
import TableContainer from './TableContainer';

// GF is short for game functions
import GF from '../gameLogic/gameFunctions';

class App extends React.Component {
  constructor() {
    super();

    // GAME STATE is managed here
    this.state = {
      gameUnderway: true,
      numPlayers: 0,
      buyIn: 0,
      smallBlind: 0,
      bigBlind: 0,
      dealer: 0,
      turn: 0,
      pot: 0,
      // 0 = pre-flop, 1 = flop, 2 = turn, 3 = river
      actionRoundState: 0,
      board: ['', '', '', '', ''],
      deckArray: [],
      minRaise: 0,
      previousBet: 0,
      allowCheck: false,
    };

    this.registerNumPlayers = this.registerNumPlayers.bind(this);
    this.registerBuyIn = this.registerBuyIn.bind(this);
    this.registerSmallBlind = this.registerSmallBlind.bind(this);
    this.registerBigBlind = this.registerBigBlind.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    // make request to API
    // if gameUnderway = true, render game view and populate game
    // if gameUnderway = false, render startup form view
  }

  registerNumPlayers(numPlayers) {
    this.setState({
      numPlayers: Number(numPlayers),
    });
  }

  // the state manages the dollar values as cents
  // (e.g. $20 is saved as 2000)
  // this allows players to play with cents without having to deal with decimals in the code
  registerBuyIn(buyIn) {
    this.setState({
      buyIn: GF.convertToCents(Number(buyIn)),
    });
  }

  registerSmallBlind(smallBlind) {
    this.setState({
      smallBlind: GF.convertToCents(Number(smallBlind)),
    });
  }

  registerBigBlind(bigBlind) {
    this.setState({
      bigBlind: GF.convertToCents(Number(bigBlind)),
    });
  }

  startGame() {
    this.setState({
      gameUnderway: true,
    });
  }

  renderGameView() {
    const { numPlayers } = this.state;

    return (
      <div>
        <div>Game View</div>
        <TableContainer />
        <PlayerContainer numPlayers={numPlayers} />
      </div>
    );
  }

  renderStartUpView() {
    const {
      numPlayers,
      buyIn,
      smallBlind,
      bigBlind,
    } = this.state;

    return (
      <div>
        <div>Welcome to PokerBirds! 🐦</div>
        <StartUpForm
          registerNumPlayers={this.registerNumPlayers}
          registerBuyIn={this.registerBuyIn}
          registerSmallBlind={this.registerSmallBlind}
          registerBigBlind={this.registerBigBlind}
          startGame={this.startGame}
          numPlayers={numPlayers}
          buyIn={buyIn}
          smallBlind={smallBlind}
          bigBlind={bigBlind}
        />
      </div>
    );
  }

  render() {
    const { gameUnderway } = this.state;
    if (gameUnderway) {
      return this.renderGameView();
    }
    return this.renderStartUpView();
  }
}

export default App;
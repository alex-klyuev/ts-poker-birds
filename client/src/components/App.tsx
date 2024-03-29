// --- ACRONYMS ---
// PG = poker game -> replacement for the state for use within functions

// libs
import React, { ReactElement } from 'react';
import axios from 'axios';
// classes, functions, and types
import  { PokerGame, Player, Board } from '../gameLogic/classes';
import {
  addToBoard,
  flop,
  rankToHandStr,
  convertToCents,
  incrementTurn,
  findNextPlayer,
  pickWinner
} from '../gameLogic/functions';
import {
  checkActionRoundEndingCondition,
  refreshActionRound,
  checkDealerRoundEndingCondition,
  refreshDealerRound
} from '../gameLogic/gameFlow';
import { ActionState, PlayerAction, PlayerActionWrapper } from '../gameLogic/types';
// components
import StartUpForm from './StartUpForm';
import PlayerContainer from './players/PlayerContainer';
import TableContainer from './table/TableContainer';
import MessageBox from './messageBox/MessageBox';


interface Props {
  gameId: number;
}

class App extends React.Component<Props, PokerGame> {

  public readonly state: PokerGame;

  constructor(props: Props) {
    super(props);

    // gameId associated with session url and backend
    const { gameId } = this.props;

    // The React app state is mapped to an instance of the Poker Game class
    // For ease of use, this object is passed in its entirety to all functions
    // and state modifiers
    this.state = new PokerGame(gameId);

    // function bindings
    this.registerNumPlayers = this.registerNumPlayers.bind(this);
    this.registerBuyIn = this.registerBuyIn.bind(this);
    this.registerSmallBlind = this.registerSmallBlind.bind(this);
    this.registerBigBlind = this.registerBigBlind.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.handlePlayerAction = this.handlePlayerAction.bind(this);
  }

  componentDidMount(): void {
    // make request to API
    // if gameUnderway = true, render game view and populate game
    // if gameUnderway = false, render startup form view

    const { gameId } = this.props;
    axios.get(`/api/gamestate/${gameId}`)
      .then((res) => {
        // set gameunderway state depending on database
        if (res.data.gameUnderway) {
          // add player methods to player objects
          const PG = this.convertData(res.data);
          this.setState(PG);
        } else {
          this.setState({
            gameUnderway: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // --- PLAYER INTERFACE & GAME FLOW FUNCTIONS ---

  handlePlayerAction(action: PlayerActionWrapper): void {
    const PG = this.state;
    // eslint-disable-next-line default-case
    switch (action.actionType) {
      case PlayerAction.Call:
        PG.playerObjectArray[PG.turn].call(PG);
        break;
      case PlayerAction.Raise:
        PG.playerObjectArray[PG.turn].raise(action.raiseAmount as number, PG);
        break;
      case PlayerAction.Fold:
        PG.playerObjectArray[PG.turn].fold();
        break;
      case PlayerAction.Check:
        PG.playerObjectArray[PG.turn].check();
        break;
    }

    incrementTurn(PG);
    // function to find the next player that is still in the game
    findNextPlayer(PG);

    // in the spirit of modularity, this function will pass the modified PG on to the next handler,
    // which will in turn update the state
    this.handleGameFlow(PG);
  }

  // this function handles the dealer rounds, action rounds, and showdown
  handleGameFlow(PG: PokerGame): void {
    const { gameId } = this.props;

    // handle the pre-flop
    if (PG.actionRoundState === 0) {
      // pre-flop, the big blind (and the small blind if it's equal to big blind)
      // have the option to check if all other players called or folded.
      let preflopCounter = 0;

      // toggles the check state for the small blind if it's equal to the big blind
      if (PG.playerObjectArray[PG.turn].actionState === ActionState.SmallBlind && PG.smallBlind === PG.bigBlind) {
        // count active raises on board; if the SB & BB are the only ones, they can check
        for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
          if (PG.playerObjectArray[i].actionState !== ActionState.Raise) {
            preflopCounter += 1;
          }
        }

        if (preflopCounter === PG.playerObjectArray.length) {
          PG.allowCheck = true;
        }
      }

      // toggles the check state for the big blind - unless the BB is equal to the SB, in which case
      // it has already been toggled.

      // edge case: big blind re-raised and all other players called. Hmmm
      // TODO(anyone): Not sure if this is a TODO still or not? ^^
      if (PG.playerObjectArray[PG.turn].actionState === ActionState.BigBlind && PG.smallBlind !== PG.bigBlind) {
        // count active raises on board; if the BB's is the only one, they can check
        for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
          if (PG.playerObjectArray[i].actionState !== ActionState.Raise) {
            preflopCounter += 1;
          }
        }
        if (preflopCounter === PG.playerObjectArray.length) {
          PG.allowCheck = true;
        }
      }

      // check if dealer round is done. comes before action round
      // because of edge case where one player checks and all others fold.
      if (checkDealerRoundEndingCondition(PG)) {
        // will set everything through the blinds up for next round
        refreshDealerRound(PG);
        PG.actionRoundState = 0;
      }

      // check if action round is done
      if (checkActionRoundEndingCondition(PG)) {
        // if so, add 3 cards to the board
        flop(PG);
        // remaining code that is the same between each action round
        refreshActionRound(PG);
        PG.actionRoundState += 1;
      }
    }

    // handle the flop and turn (same functionality for each)
    if (PG.actionRoundState === 1 || PG.actionRoundState === 2) {
      if (checkDealerRoundEndingCondition(PG)) {
        refreshDealerRound(PG);
        PG.actionRoundState = 0;
      }

      if (checkActionRoundEndingCondition(PG)) {
        addToBoard(PG); // turn & river
        refreshActionRound(PG);
        PG.actionRoundState += 1;
      }
    }

    // handle the river
    if (PG.actionRoundState === 3) {
      if (checkDealerRoundEndingCondition(PG)) {
        refreshDealerRound(PG);
        PG.actionRoundState = 0;
        return;
      }

      // the difference on the river is the opportunity for a showdown
      if (checkActionRoundEndingCondition(PG)) {
        // set the winning hand rank and its player index
        const winHandRank = pickWinner(PG);

        // give the player the pot and reset it to 0
        PG.playerObjectArray[winHandRank.playerIndex as number].stack += PG.pot;
        PG.pot = 0;

        // state the winner and how they won
        PG.message = `Player ${PG.playerObjectArray[winHandRank.playerIndex as number].ID}`;
        PG.message += ` won with a ${rankToHandStr(winHandRank.rank[0])}`;

        // reset the dealer round
        refreshDealerRound(PG);
        PG.actionRoundState = 0;
      }
    }

    // update the state in the database and do the same
    // in the app upon successful write
    axios.post(`/api/gamestate/${gameId}`, PG)
      .then(() => {
        this.setState(PG);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // --- GAME STARTUP FUNCTIONS ---

  registerNumPlayers(numPlayersInput: string): void {
    const numPlayers = Number(numPlayersInput);
    const playerObjectArray = [];
    for (let i = 1; i <= numPlayers; i += 1) {
      playerObjectArray.push(new Player(i));
    }
    this.setState({
      numPlayers,
      playerObjectArray,
    });
  }

  // the state manages the dollar values as cents
  // (e.g. $20 is saved as 2000)
  // this allows players to play with cents without having to deal with decimals in the code
  registerBuyIn(buyInInput: string): void {
    const buyIn = convertToCents(Number(buyInInput));

    // assign the buy in to each player
    const { playerObjectArray } = this.state;
    playerObjectArray.forEach((player) => {
      player.stack = buyIn;
    });

    this.setState({
      playerObjectArray,
      buyIn,
    });
  }

  registerSmallBlind(smallBlindInput: string): void {
    this.setState({
      smallBlind: convertToCents(Number(smallBlindInput)),
    });
  }

  registerBigBlind(bigBlindInput: string): void {
    this.setState({
      bigBlind: convertToCents(Number(bigBlindInput)),
    });
  }

  // --- START & STOP GAME FUNCTIONS ---

  startGame(): void {
    const { gameId } = this.props;
    const PG = this.state;

    // pick random player to begin as the first dealer
    PG.dealer = Math.floor(Math.random() * PG.playerObjectArray.length);
    PG.gameUnderway = true;

    // start the dealer round
    refreshDealerRound(PG);

    // update the state in the database and do the same
    // in the app upon successful write
    axios.post(`/api/gamestate/${gameId}`, PG)
      .then(() => {
        this.setState(PG);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  endGame(): void {
    const { gameId } = this.props;
    const PG = new PokerGame(gameId);

    axios.post(`/api/gamestate/${gameId}`, PG)
      .then(() => {
        this.setState(PG);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  // --- HELPER FUNCTIONS ---

  convertData(PG: PokerGame): PokerGame {
    // iterate through all players
    // create new player instances so that they have the player methods
    // overwrite player properties with the data in the database
    for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
      const source = PG.playerObjectArray[i];
      const target = new Player(i + 1);
      Object.assign(target, source);
      PG.playerObjectArray[i] = target;
    }

    // assign board data to class as well to get the iterateIndex method
    const { cards, index } = PG.board;
    PG.board = new Board(cards, index);

    return PG;
  }

  // --- RENDER VIEW FUNCTIONS ---

  renderGameView(): ReactElement {
    const PG = this.state;

    return (
      <div>
        <TableContainer PG={PG} />
        <PlayerContainer
          PG={PG}
          handlePlayerAction={this.handlePlayerAction}
        />
        <MessageBox message={PG.message} endGame={this.endGame} />
      </div>
    );
  }

  renderStartUpView(): ReactElement {
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

  render(): ReactElement {
    const { gameUnderway } = this.state;
    if (gameUnderway) {
      return this.renderGameView();
    }
    return this.renderStartUpView();
  }
}

export default App;

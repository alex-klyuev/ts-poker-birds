import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { convertToCents } from '../../gameLogic/functions';
import { PokerGame } from '../../gameLogic/classes';
// convert PlayerActions enum to TPlayerActions to avoid declaration issue with PlayerACtions component
import { PlayerActions as TPlayerActions, PlayerActionsWrapper } from '../../gameLogic/types';


// START HERE: broke the game with player actions modifications


const Container = styled.div`
  width: 144px;
  height: 90px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
`;

const Button = styled.button`
  height: 25px;
  width: 60px;
`;

const Input = styled.input`
  width: 120px;
  height: 24px;
  margin: 2px 10px;
`;

interface Props {
  PG: PokerGame;
  empty: boolean;
  handlePlayerAction: (playerAction: PlayerActionsWrapper) => void;
}

interface State {
  value: string;
}

interface PlayerActionsValidationWrapper {
  valid: boolean;
  playerAction?: PlayerActionsWrapper;
}

class PlayerActions extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e: FormEvent): void {
    const target = e.target as HTMLInputElement;
    this.setState({
      value: target.value,
    });
  }

  // validate that player action is allowed, and return an object for use in App
  // to update the state
  validatePlayerAction(action: TPlayerActions): PlayerActionsValidationWrapper {
    const { PG } = this.props;
    const { value } = this.state;
    let numericInput = value;

    // this multi-block if statement both validates the input
    // and returns call, check, or fold if it's one of those.
    // if it's a raise, it goes on to the next section to validate the amount
    if (action === TPlayerActions.Call) {
      // validate that there is a raise on the board to be called.
      // Second part is to allow the SB to call when it is not equal to the big blind

      let raiseCounter = 0;
      for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
        // this allows the small blind to call big blind as well
        if (PG.playerObjectArray[i].actionState === 'raise' || (PG.playerObjectArray[i].actionState === 'SB')) {
          raiseCounter += 1;
        }
      }

      // exception for situation where small blind is equal to big blind; SB cannot call there
      // eslint-disable-next-line no-mixed-operators
      if (raiseCounter === 0 || PG.playerObjectArray[PG.turn].actionState === 'SB' && PG.smallBlind === PG.bigBlind) {
        alert('You cannot call here.');

        return { valid: false };
      }
      return {
        valid: true,
        playerAction: {
          actionType: TPlayerActions.Call
        }
      };
    } if (action === TPlayerActions.Fold) {
      return {
        valid: true,
        playerAction: {
          actionType: TPlayerActions.Fold
        }
      };
    } if (action === TPlayerActions.Check) {
      // validate that player is allowed to check
      if (PG.allowCheck === false) {
        alert('You cannot check here.');
        return { valid: false };
      }
      return {
        valid: true,
        playerAction: {
          actionType: TPlayerActions.Fold
        }
      };
    } if (action !== TPlayerActions.Raise) {
      return { valid: false };
    }

    // second input: verify that the raise is an increment of the small blind,
    // equal or above the minimum raise, and less than or equal to the player's stack.
    // exception is made if player bets stack; then bet gets through regardless of the min raise.
    const raiseAmount = convertToCents(parseFloat(numericInput));
    if (raiseAmount === PG.playerObjectArray[PG.turn].stack) {
      return {
        valid: true,
        playerAction: {
          actionType: TPlayerActions.Raise,
          raiseAmount
        }
      };
    }
    if (raiseAmount % PG.smallBlind !== 0
      || raiseAmount < PG.previousBet + PG.minRaise
      || raiseAmount > PG.playerObjectArray[PG.turn].stack
      + PG.playerObjectArray[PG.turn].potCommitment) {
      alert('You can\'t raise that amount.');

      return { valid: false };
    }
    return {
      valid: true,
      playerAction: {
        actionType: TPlayerActions.Raise,
        raiseAmount
      }
    };
  }

  render() {
    const { empty, handlePlayerAction } = this.props;

    if (empty) {
      return <Container />;
    }

    return (
      <Container>
        <Row>
          <Button
            type="button"
            onClick={() => {
              const inputAction = this.validatePlayerAction(TPlayerActions.Fold);
              if (!inputAction.valid) {
                return;
              }
              handlePlayerAction(inputAction.playerAction as PlayerActionsWrapper);
            }}
          >
            Fold
          </Button>
          <Button
            type="button"
            onClick={() => {
              const inputAction = this.validatePlayerAction(TPlayerActions.Check);
              if (!inputAction.valid) {
                return;
              }
              handlePlayerAction(inputAction.playerAction as PlayerActionsWrapper);
            }}
          >
            Check
          </Button>
        </Row>
        <Row>
          <Button
            type="button"
            onClick={() => {
              const inputAction = this.validatePlayerAction(TPlayerActions.Call);
              if (!inputAction.valid) {
                return;
              }
              handlePlayerAction(inputAction.playerAction as PlayerActionsWrapper);
            }}
          >
            Call
          </Button>
          <Button
            type="button"
            onClick={() => {
              const inputAction = this.validatePlayerAction(TPlayerActions.Raise);
              if (!inputAction.valid) {
                return;
              }
              handlePlayerAction(inputAction.playerAction as PlayerActionsWrapper);
            }}
          >
            Bet
          </Button>
        </Row>
        <Row>
          <Input placeholder="Bet amount..." onChange={this.handleInputChange} />
        </Row>
      </Container>
    );
  }
}

export default PlayerActions;

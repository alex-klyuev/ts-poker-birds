import { buildDeck, dealCards } from './cards';

// increments turn so that it can loop around the table
const incrementTurn = (PG) => {
  PG.turn += 1;
  PG.turn %= PG.playerObjectArray.length;

  // TO-DO: fix the message box
  // eslint-disable-next-line max-len
  // PG.message = `Player ${PG.playerObjectArray[PG.dealer].ID} is the dealer\nPlayer ${PG.playerObjectArray[PG.turn].ID}, it's your turn`;
};

// this function finds the next player that's still in the game and increments the turn to them
const findNextPlayer = (PG) => {
  // iterates starting from the current turn until it finds the next player that hasn't folded,
  // then breaks the loop
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    if (!PG.playerObjectArray[PG.turn].inGame) {
      incrementTurn(PG);
    } else {
      break;
    }
  }
};

const postBlinds = (PG) => {
  // post small blind
  PG.minRaise = 0;
  PG.previousBet = 0;
  PG.playerObjectArray[PG.turn].raise(PG.smallBlind, PG);
  PG.playerObjectArray[PG.turn].actionState = 'SB';
  incrementTurn(PG);

  // post big blind; vars are set to 0 to allow a raise (so that later bb can check at the end of pre-flop)
  PG.minRaise = 0;
  PG.previousBet = 0;
  PG.playerObjectArray[PG.turn].raise(PG.bigBlind, PG);
  PG.playerObjectArray[PG.turn].actionState = 'BB';
  incrementTurn(PG);
  PG.minRaise = PG.bigBlind;
  PG.previousBet = PG.bigBlind;
  PG.allowCheck = false;
};

// just to make it easier to keep track where I'm doing this
const convertToDollars = (value) => {
  value /= 100;
  return value;
};
const convertToCents = (value) => {
  value *= 100;
  return value;
};

// Action round ending conditions fall into two categories:
//  1. "No-raise": where there has been no raise and everyone checks or folds,
//  or in the case of the pre-flop, calls, checks, or folds.
//  2. "Raise": where there is one remaining raiser and everyone else behind calls or folds.
const checkActionRoundEndingCondition = (PG) => {
  let actionCounter1 = 0;
  let actionCounter2 = 0;
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    // handles both pre-flop and post-flop "no raise" situations
    if (PG.playerObjectArray[i].actionState === 'call' || PG.playerObjectArray[i].actionState === 'fold'
      || PG.playerObjectArray[i].actionState === 'check' || PG.playerObjectArray[i].actionState === '') {
      actionCounter1 += 1;
    }

    // JJ-COMMENT: if else instead of two if statements?

    // handles "raise" situations
    if (PG.playerObjectArray[i].actionState === 'call' || PG.playerObjectArray[i].actionState === 'fold'
      || PG.playerObjectArray[i].actionState === '') {
      actionCounter2 += 1;
    }
  }

  // can be combined later
  // no-raise scenario
  if (actionCounter1 === PG.playerObjectArray.length) {
    console.log('action round ended via no-raise scenario'); // free cards smh cod clam it
    return true;
  }

  // raise scenario
  if (actionCounter2 === PG.playerObjectArray.length - 1 && PG.playerObjectArray[PG.turn].actionState === 'raise') {
    console.log('action round ended via raise scenario'); // no free cards baby!
    return true;
  }

  // action round ending conditions not met
  return false;
};

// this function will end the dealer round when everyone except one person has folded.
// That person will win the pot. This is one of two ways a dealer round can end;
// the other is with a showdown, which has its own function.
const checkDealerRoundEndingCondition = (PG) => {
  let dealerCounter = 0;
  let winnerIndex;
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    if (PG.playerObjectArray[i].actionState === 'fold' || PG.playerObjectArray[i].actionState === '') {
      dealerCounter += 1;
    } else {
      winnerIndex = i;
    }
  }

  if (dealerCounter === PG.playerObjectArray.length - 1) {
    // move pot to winner's stack
    PG.playerObjectArray[winnerIndex].stack += PG.pot;
    PG.message = `Player ${PG.playerObjectArray[winnerIndex].ID} wins $${convertToDollars(PG.pot)}`;
    PG.pot = 0;
    return true;
  }

  // dealer round didn't end
  return false;
};

// this function restarts the following action round
const refreshActionRound = (PG) => {
  // clear pot commitment and action states; cards remain the same; reset PG.minraise
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    PG.playerObjectArray[i].potCommitment = 0;
    PG.playerObjectArray[i].actionState = '';
  }
  PG.previousBet = 0;
  PG.minRaise = PG.bigBlind;

  // action in remaining three rounds begins with the small blind
  PG.turn = PG.dealer;
  incrementTurn(PG);
  findNextPlayer(PG);

  // hacky way of setting players to still be in the action round so that the ending condition
  // functions don't immediately read the turn as over at the beginning of the round (could probably
  // be improved to be more clear). Still a blank string so that nothing is output to the board
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    if (PG.playerObjectArray[i].inGame) {
      PG.playerObjectArray[i].actionState = ' ';
    }
  }

  // allow checking at beginning of round
  PG.allowCheck = true;

  // unnecessary for react:
  // outputGameStatus(PG);
  // outputPlayerInquiry(PG);
};

// this function restarts the following dealer round
const refreshDealerRound = (PG) => {
  // refresh all these variables.
  for (let i = 0; i < PG.playerObjectArray.length; i += 1) {
    PG.playerObjectArray[i].potCommitment = 0;
    PG.playerObjectArray[i].actionState = '';
    PG.playerObjectArray[i].cards = [[], []];
    PG.playerObjectArray[i].inGame = true;

    // If a player lost their money, they stay out;
    // buy back or leave table functionality not included

    // DOUBLE CHECK THIS when showdown and side-pot parts are developed
    if (PG.playerObjectArray[i].stack === 0) {
      PG.playerObjectArray[i].inGame = false;
    }
  }

  // increment dealer
  PG.dealer += 1;
  PG.dealer %= PG.playerObjectArray.length;

  // clear the board, build a new full deck, and deal cards to the players
  PG.board.cards = [];
  buildDeck(PG);
  dealCards(PG);

  // set turn to small blind, next after dealer
  PG.turn = PG.dealer;
  incrementTurn(PG);

  // post blinds
  postBlinds(PG);

  // edge case scenario where there are only 2 players and sb = bb,
  // first player to act is sb. this allows them to check
  if (PG.playerObjectArray[PG.turn].actionState === 'SB' && PG.smallBlind === PG.bigBlind) {
    PG.allowCheck = true;
  }

  // declare the dealer, output the first game board, and announce the first turn
  PG.message += `\nPlayer ${PG.playerObjectArray[PG.dealer].ID} is the dealer\nPlayer ${PG.playerObjectArray[PG.turn].ID}, it's your turn`;
};

export default {
  incrementTurn,
  postBlinds,
  convertToDollars,
  convertToCents,
  checkActionRoundEndingCondition,
  checkDealerRoundEndingCondition,
  refreshActionRound,
  refreshDealerRound,
  findNextPlayer,
};

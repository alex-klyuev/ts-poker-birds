// Action State is different from PlayerAction, though it includes all the player actions
// The Action State properties are used to determine certain things about the player and
// the game state as a whole. For example, a player that has folded indicates that their
// cards should disappear. Including the blinds allows for logic surrounding the blinds
// (for example, pre-flop action starts at the player next of the big blind)

export enum ActionState {
  Call = 'CALL',
  Raise = 'RAISE',
  Fold = 'FOLD',
  Check = 'CHECK',
  SmallBlind = 'SMALLBLIND',
  BigBlind = 'BIGBLIND',
  NoAction = 'NOACTION',
  Standby = 'STANDBY'
}

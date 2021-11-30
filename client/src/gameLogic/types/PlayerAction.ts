// Represents the 4 actions a player can take during their turn
export enum PlayerAction {
  Call = 'CALL',
  Raise = 'RAISE',
  Fold = 'FOLD',
  Check = 'CHECK'
}

export interface PlayerActionWrapper {
  actionType: PlayerAction;
  raiseAmount?: number;
}

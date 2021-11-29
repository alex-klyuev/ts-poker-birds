export enum PlayerActions {
  Call = 'call',
  Raise = 'raise',
  Fold = 'fold',
  Check = 'check'
}

export interface PlayerActionsWrapper {
  actionType: PlayerActions;
  raiseAmount?: number;
}

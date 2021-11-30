// TO-DO: refactor min bet to be part of the message box

import { ReactElement } from 'react';
import styled from 'styled-components';
import PlayerActions from './PlayerActions';
import { convertToDollars, stringifyCard } from '../../gameLogic/functions';
// convert Player class to TPlayer type to avoid declaration issue with Player component
import { Player as TPlayer, PokerGame } from '../../gameLogic/classes';
import { PlayerActionWrapper } from '../../gameLogic/types';

const Container = styled.div`
  width: 144px;
  height: 300px;
`;

const CardBox = styled.div`
  display: flex;
`;

const CardContainer = styled.div`
  width: 72px;
  padding: 1px;
  height: 100px;
`;

const Text = styled.div`
  padding: 2px;
  font-weight: bold;
  height: 18px;
  margin-left: 5px;
`;

interface Props {
  player: TPlayer;
  PG: PokerGame;
  handlePlayerAction: (action: PlayerActionWrapper) => void;
}

const Player = (props: Props): ReactElement => {
  const {
    player,
    PG,
    handlePlayerAction,
  } = props;

  // 3 card view options: player is out of the game,
  // player is in but not their turn, or it's player's turn
  let cardView;
  let minBetView = <Text />;
  let playerActionView = (
    <PlayerActions
      empty={true}
      PG={PG}
      handlePlayerAction={handlePlayerAction}
    />
  );

  // player is not in game
  if (!player.inGame) {
    cardView = (
      <CardBox>
        <CardContainer />
        <CardContainer />
      </CardBox>
    );
  } else if (player.ID === PG.turn + 1 && player.cards.length !== 0) {
    // player is in game and it's their turn (cards shown, actions available)
    cardView = (
      <CardBox>
        <CardContainer>
          <img alt="" className="card" src={`lib/cards/${stringifyCard(player.cards[0])}.svg`} />
        </CardContainer>
        <CardContainer>
          <img alt="" className="card" src={`lib/cards/${stringifyCard(player.cards[1])}.svg`} />
        </CardContainer>
      </CardBox>
    );

    // TO-DO: refactor min bet to be part of the message box
    // min bet is equal to the previous bet plus the min raise
    minBetView = (
      <Text>
        Min bet: $
        {convertToDollars(PG.previousBet + PG.minRaise)}
      </Text>
    );

    playerActionView = (
      <PlayerActions
        empty={false}
        PG={PG}
        handlePlayerAction={handlePlayerAction}
      />
    );
  } else {
    // player is in game but it's not their turn (cards face down)
    cardView = (
      <CardBox>
        <CardContainer>
          <img alt="" className="card" src={`lib/cards/${PG.deckColor}_Back.svg`} />
        </CardContainer>
        <CardContainer>
          <img alt="" className="card" src={`lib/cards/${PG.deckColor}_Back.svg`} />
        </CardContainer>
      </CardBox>
    );
  }

  const potCommitmentView = (player.potCommitment === 0) ? <Text /> : (
    <Text>
      $
      {convertToDollars(player.potCommitment)}
    </Text>
  );

  return (
    <Container>
      <Text>
        Player
        <span> </span>
        {player.ID}
      </Text>
      <Text>
        $
        {convertToDollars(player.stack)}
      </Text>
      {cardView}
      <Text>
        {player.actionState}
      </Text>
      {potCommitmentView}
      {minBetView}
      {playerActionView}
    </Container>
  );
};

export default Player;

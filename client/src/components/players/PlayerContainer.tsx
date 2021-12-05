import { ReactElement } from 'react';
import styled from 'styled-components';
import Player from './Player';
import { PokerGame } from '../../gameLogic/classes';
import { PlayerActionWrapper } from '../../gameLogic/types';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  height: 300px;
  width: 100vw;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
`;

interface Props {
  PG: PokerGame;
  handlePlayerAction: (action: PlayerActionWrapper) => void;
}

const PlayerContainer = (props: Props): ReactElement => {
  const {
    PG,
    handlePlayerAction,
  } = props;

  return (
    <Container>
      {PG.playerObjectArray.map((player) => (
        <Player
          key={player.ID}
          player={player}
          PG={PG}
          handlePlayerAction={handlePlayerAction}
        />
      ))}
    </Container>
  );
};

export default PlayerContainer;

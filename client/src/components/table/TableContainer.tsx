import { ReactElement } from 'react';
import styled from 'styled-components';
import { PokerGame } from '../../gameLogic/classes';
import Board from './Board';
import Pot from './Pot';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  height: 500px;
  width: 100vw;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
`;

interface Props {
  PG: PokerGame;
}

const TableContainer = (props: Props): ReactElement => {
  const { PG } = props;
  return (
    <Container>
      <div>
        <Board PG={PG} />
        <Pot pot={PG.pot} />
      </div>
    </Container>
  );
};

export default TableContainer;

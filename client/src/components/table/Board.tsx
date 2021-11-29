import { ReactElement } from 'react';
import styled from 'styled-components';
// convert Board class to TBoard type to avoid declaration issue with Board component
import { Board as TBoard, PokerGame } from '../../gameLogic/classes';
import { stringifyCard } from '../../gameLogic/functions';

const Deck = styled.div`
  height: 100px;
  margin: 10px 0px;
  display: flex;
  justify-content: center;
`;

const BoardContainer = styled.div`
  display: flex;
  width: 360px;
  height: 102px;
  justify-content: left;
`;

const CardContainer = styled.div`
  width: 72px;
  height: 100px;
  padding: 1px;
`;

interface Props {
  PG: PokerGame;
  board: TBoard;
}

const Board = (props: Props): ReactElement => {
  const { PG } = props;
  const { board } = PG;

  return (
    <div>
      <Deck>
        <CardContainer>
          <img alt="" className="card" src={`lib/cards/${PG.deckColor}_Back.svg`} />
        </CardContainer>
      </Deck>
      <BoardContainer>
          {board.cards.map((card) => {
            const cardString = stringifyCard(card);
            return (
              <CardContainer key={cardString}>
                <img alt="" className="card" src={`lib/cards/${cardString}.svg`} />
              </CardContainer>
            );
          })}
        </BoardContainer>
    </div>
  );
};

export default Board;

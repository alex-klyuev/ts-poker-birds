import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const Board = (props) => {
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

Board.propTypes = {
  PG: PropTypes.shape(/* fill me in */).isRequired,
};

export default Board;

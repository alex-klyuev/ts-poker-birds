import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Player from './players/Player';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  height: 200px;
  width: 100vw;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
`;

const PlayerContainer = (props) => {
  const { numPlayers } = props;
  const playerIds = [];

  // ID's will be one-indexed to match how players think of the game
  for (let i = 1; i <= numPlayers; i += 1) {
    playerIds.push(i);
  }

  return (
    <Container>
      {playerIds.map((id) => <Player key={id} id={id} />)}
    </Container>
  );
};

PlayerContainer.propTypes = {
  numPlayers: PropTypes.number.isRequired,
};

export default PlayerContainer;
import { ReactElement } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: darkred;
  color: white;
  font-size: 16px;
  font-weight: 500;
  width: 120px;
  height: 40px;
  border-radius: 15px;
`;

interface Props {
  endGame: () => void;
}

const EndGame = (props: Props): ReactElement => {
  const { endGame } = props;
  return (
    <Button type="button" onClick={endGame}>End Game</Button>
  );
};

export default EndGame;

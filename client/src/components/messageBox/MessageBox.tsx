import { ReactElement } from 'react';
import styled from 'styled-components';
import EndGame from './EndGame';

const Container = styled.div`
  height: 100px;
  width: 100vw;
  margin-top: 30px;
`;

const Line = styled.h2`
  height: 20px;
  text-align: center;
`;

interface Props {
  message: string;
  endGame: () => void;
}

const MessageBox = (props: Props): ReactElement => {
  const { message, endGame } = props;
  const lines = message.split('\n');
  return (
    <Container>
      {lines.map((line) => <Line key={line}>{line}</Line>)}
      <Line>
        <EndGame endGame={endGame} />
      </Line>
    </Container>
  );
};

export default MessageBox;

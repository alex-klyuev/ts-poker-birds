import { ReactElement } from 'react';
import styled from 'styled-components';
import { convertToDollars } from '../../gameLogic/functions';

const OuterContainer = styled.div`
  margin-top: 30px;
  border-style: solid;
  border-radius: 2px;
  border-color: black;
  display: flex;
  justify-content: center;
  width: 360px;
  height: 150px;
`;

const PotContainer = styled.h3`
  padding: 25px;
  color: green;
`;

const Text = styled.h4`
  text-align: center;
`;

interface Props {
  pot: number;
}

const Pot = (props: Props): ReactElement => {
  const { pot } = props;
  return (
    <OuterContainer>
      <div>
        <PotContainer>{`$${convertToDollars(pot)}`}</PotContainer>
        <Text>Pot</Text>
      </div>
    </OuterContainer>
  );
};

export default Pot;

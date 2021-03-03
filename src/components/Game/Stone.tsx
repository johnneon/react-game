import * as React from 'react';
import styled, { keyframes } from 'styled-components';

interface IStoneProps {
  dot: number[];
}

const scale = keyframes`
  0% {
    transform: scale(1.2);
  }

  50% {
    transform: scale(.8);
  }

  100% {
    transform: scale(1.2);
  }
`;

const StoneItem = styled.div`
  position: absolute;
  z-index: 1;
  width: calc(2% + 1px);
  height: calc(2% + 1px);
  background: #f44336;
  box-shadow: 0 0 15px 3px rgba(244, 67, 54, .7);
  border-bottom: 1px solid #f44336;
  border-right: 1px solid #f44336;
  animation: ${scale} 2s linear infinite;
`;

const Stone: React.FunctionComponent<IStoneProps> = (props) => {
  const [top, left] = props.dot;
  const style = {
    top: `${top}%`,
    left: `${left}%`
  }

  return <StoneItem style={style} />;
};

export default Stone;

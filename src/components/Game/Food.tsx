import * as React from 'react';
import styled, { keyframes } from 'styled-components';

interface IFoodProps {
  dot: number[];
}

const scale = keyframes`
  0% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(.8);
  }

  100% {
    transform: scale(1.1);
  }
`;

const FoodItem = styled.div`
  position: absolute;
  z-index: 1;
  width: 2%;
  height: 2%;
  background: #15b104;
  box-shadow: 0 0 15px 3px rgba(21, 177, 4, .7);
  border-bottom: 1px solid #15b104;
  border-right: 1px solid #15b104;
  animation: ${scale} 2s linear infinite;
`;

const Food: React.FunctionComponent<IFoodProps> = (props) => {
  const [top, left] = props.dot;
  const style = {
    top: `${top}%`,
    left: `${left}%`
  }

  return <FoodItem style={style} />;
};

export default Food;

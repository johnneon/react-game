import * as React from 'react';
import styled from 'styled-components';

interface IFoodProps {
  dot: number[];
}

const FoodItem = styled.div`
  position: absolute;
  z-index: 1;
  width: 2%;
  height: 2%;
  background: red;
  border: 1px solid #fff;
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

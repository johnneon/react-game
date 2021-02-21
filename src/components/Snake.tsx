import React from 'react';
import styled from 'styled-components';

interface ISnakeProps {
  snakeDots: Array<number[]>;
}

const SnakeDot = styled.div`
  position: absolute;
  z-index: 2;
  width: 2%;
  height: 2%;
  background: #000;
  border: 1px solid #fff;
  transition: all .1s linear;
`;

const Snake: React.FunctionComponent<ISnakeProps> = (props) => {
  return (
    <>
      {props.snakeDots.map((dot: number[], i) => {
        const [top, left] = dot;
        const style = {
          top: `${top}%`,
          left: `${left}%`
        }

        return (
          <SnakeDot style={style} key={i} />
        );
      })}
    </>
  );
};

export default Snake;

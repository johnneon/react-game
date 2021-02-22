import React from 'react';
import styled from 'styled-components';
import { rotationCalculate } from '../utils/utils';
import { variables } from '../variables';

const {
  UP,
  DOWN,
  RIGHT,
  LEFT,
} = variables;
interface ISnakeProps {
  snakeDots: Array<number[]>;
}

type StyledProps = {
  head: boolean;
  ternPart: string;
}

const SnakeDot = styled.div`
  width: 2%;
  height: 2%;

  position: absolute;
  z-index: 2;

  background: ${(props: StyledProps) => props.head ? 'green' : '#000'};
  border-radius: ${(props: StyledProps) => {
    let radius = '0px 0px 0px 0px';
    const [top, right, down, left] = [
      '10px 0px 0px 0px',
      '0px 10px 0px 0px',
      '0px 0px 10px 0px',
      '0px 00px 0px 10px'
    ];
    switch (props.ternPart) {
      case UP:
        radius = top;
        break;
      case DOWN:
        radius = down;
        break;
      case RIGHT:
        radius = right;
        break;
      case LEFT:
        radius = left;
        break;
    
      default:
        radius = '0px 0px 0px 0px';
        break;
    }

    return radius;
  }};
  transition: all .1s linear;
`;

const Snake: React.FunctionComponent<ISnakeProps> = (props) => {
  return (
    <>
      {props.snakeDots.map((dot: number[], i) => {
        const [top, left] = dot;
        const [nextTop, nextLeft] = props.snakeDots[i + 1] || [];
        const [prevTop, prevLeft] = props.snakeDots[i - 1] || [];

        const style = {
          top: `${top}%`,
          left: `${left}%`
        };

        let ternPart: string = rotationCalculate({
          top,
          nextTop,
          prevTop,
          left,
          nextLeft,
          prevLeft
        });

        return (
          <SnakeDot
            ternPart={ternPart}
            head={i === props.snakeDots.length - 1 ? true : false}
            style={style} key={i}
          />
        );
      })}
    </>
  );
};

export default Snake;

import React from 'react';
import styled from 'styled-components';
import { calculateOpacity, rotationCalculate } from '../../utils/utils';
import { variables } from '../../variables';

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
  opacity: number;
  top: number;
  left: number;
}

const SnakeDot = styled.div.attrs((props: StyledProps) => ({
  style: {
    top: `${props.top}%`,
    left: `${props.left}%`,
  }
}))`
  width: calc(2% + 1px);
  height: calc(2% + 1px);

  position: absolute;
  z-index: 2;

  background: ${(props: StyledProps) => `rgba(255, 255, 255, ${props.opacity});`}
  box-shadow: ${(props: StyledProps) => props.head ? '0 0 15px 3px rgba(255, 255, 255, .5);' : '0;'}
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
`;

const Snake: React.FunctionComponent<ISnakeProps> = (props) => {
  const { snakeDots } = props;

  const opacity = calculateOpacity(snakeDots);

  return (
    <>
      {props.snakeDots.map((dot: number[], i) => {
        const [top, left] = dot;
        const [nextTop, nextLeft] = props.snakeDots[i + 1] || [];
        const [prevTop, prevLeft] = props.snakeDots[i - 1] || [];

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
            opacity={opacity[i]}
            head={i === props.snakeDots.length - 1}
            top={top}
            left={left}
            key={i}
          />
        );
      })}
    </>
  );
};

export default Snake;

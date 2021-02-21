import React from 'react';
import styled from 'styled-components';

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
    // ! В общем... Ты остановлися на закруглении краев змейки и паузе в игре.
    switch (props.ternPart) {
      case 'UP':
        radius = '0px 0px 5px 0px';
        break;
      case 'DOWN':
        radius = '0px 5px 0px 0px';
        break;
      case 'RIGHT':
        radius = '5px 0px 0px 0px';
        break;
      case 'LEFT':
        radius = '0px 0px 0px 5px';
        break;
    
      default:
        radius = '0px 0px 0px 0px';
        break;
    }

    return radius;
  }};
  border: 1px solid #fff;
  transition: all .5s linear;
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
        let ternPart: string = '';

        if (top < nextTop && top === prevTop) {
          ternPart = 'UP';
        } else if (top > nextTop && top === prevTop) {
          ternPart = 'DOWN';
        }
        if (left < nextLeft && left === prevLeft) {
          ternPart = 'RIGHT';
          console.log('right')
        } else if (left > nextLeft && left === prevLeft) {
          ternPart = 'LEFT';
        }

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

import React from 'react';
import styled from 'styled-components';
import { calculateOpacity } from '../../utils/utils';
interface ISnakeProps {
  snakeDots: Array<number[]>;
  isLightTheme: boolean;
}

type StyledProps = {
  head: boolean;
  opacity: number;
  top: number;
  left: number;
  isLightTheme: boolean;
}

const SnakeDot = styled.div.attrs((props: StyledProps) => ({
  style: {
    top: `${props.top}%`,
    left: `${props.left}%`,
    opacity: `${props.opacity}`
  }
}))`
  width: calc(2% + 1px);
  height: calc(2% + 1px);

  position: absolute;
  z-index: 2;
  
  
  box-shadow: ${(props: StyledProps) => props.head ? `0 0 15px 3px rgba(${props.isLightTheme ? '0, 0, 0,' : '255, 255, 255,'} .5);` : '0;'}
  background: rgb${(props: StyledProps) => props.isLightTheme ? '(0, 0, 0)' : '(255, 255, 255)'};
`;

const Snake: React.FunctionComponent<ISnakeProps> = (props) => {
  const { snakeDots } = props;

  const opacity = calculateOpacity(snakeDots);

  return (
    <>
      {props.snakeDots.map((dot: number[], i) => {
        const [top, left] = dot;

        return (
          <SnakeDot
            opacity={opacity[i]}
            head={i === props.snakeDots.length - 1}
            top={top}
            left={left}
            isLightTheme={props.isLightTheme}
            key={i}
          />
        );
      })}
    </>
  );
};

export default Snake;

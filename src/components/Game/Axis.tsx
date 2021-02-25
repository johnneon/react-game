import React from 'react';
import styled from 'styled-components';
import { variables } from '../../variables';

const {
  DOWN,
  RIGHT
} = variables;

interface IAxisProps {
  isLightTheme: boolean;
  direction: string;
  quantity: null[];
}

type StyledProps = {
  isLightTheme: boolean;
  direction: string;
  number: number;
}

const Line = styled.div`
  position: absolute;
  ${(props: StyledProps) => {
    let style = '';
    if (props.direction === DOWN) {
      style = `
        width: 2%;
        height: 100%;
        border-left: 1px solid;
        top: 0;
        left: ${props.number * 2}%;
      `;
    } else if (props.direction === RIGHT) {
      style = `
        width: 100%;
        height: 2%;
        border-top: 1px solid;
        top: ${props.number * 2}%;
        left: 0;
      `;
    }

    return style;
  }}
  border-color: ${(props: StyledProps) => props.isLightTheme ? 'rgba(0, 0, 0, .3)' : 'rgba(255, 255, 255, .3)'};

  &:first-child {
    border: 0;
  }
`;

const Axis: React.FunctionComponent<IAxisProps> = (props) => {
  const { isLightTheme, direction } = props;
  console.log(isLightTheme);
  return (
    <>
      {props.quantity.map((el, i) => <Line isLightTheme={isLightTheme} number={i} direction={direction} key={i} />)}
    </>
  );
};

export default Axis;

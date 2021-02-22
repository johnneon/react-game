import React from 'react';
import styled from 'styled-components';
import { variables } from '../../variables';

const {
  DOWN,
  RIGHT
} = variables;

interface IAxisProps {
  direction: string;
  quantity: null[];
}

type StyledProps = {
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
        border-left: 1px solid rgba(255, 255, 255, .3);
        top: 0;
        left: ${props.number * 2}%;
      `;
    } else if (props.direction === RIGHT) {
      style = `
        width: 100%;
        height: 2%;
        border-top: 1px solid rgba(255, 255, 255, .3);
        top: ${props.number * 2}%;
        left: 0;
      `;
    }
    

    return style;
  }}

  &:first-child {
    border: 0;
  }
`;

const Axis: React.FunctionComponent<IAxisProps> = (props) => {
  return (
    <>
      {props.quantity.map((el, i) => <Line number={i} direction={props.direction} key={i} />)}
    </>
  );
};

export default Axis;

import { IRotateTerns } from "../interfaces";
import { variables } from '../variables';

const {
  UP,
  DOWN,
  RIGHT,
  LEFT,
} = variables;

export const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

  return [x, y];
};

export const rotationCalculate = ({
  top,
  nextTop,
  prevTop,
  left,
  nextLeft,
  prevLeft
}: IRotateTerns) => {
  let ternPart: string = '';

  if (top < nextTop && top === prevTop) {
    if (left < prevLeft) {
      ternPart = UP;
    } else {
      ternPart = RIGHT;
    }
  } else if (top > nextTop && top === prevTop) {
    if (left > prevLeft) {
      ternPart = DOWN;
    } else {
      ternPart = LEFT;
    }
  }

  if (left < nextLeft && left === prevLeft) {
    if (top < prevTop) {
      ternPart = UP;
    } else {
      ternPart = LEFT;
    }
  } else if (left > nextLeft && left === prevLeft) {
    if (top > prevTop) {
      ternPart = DOWN;
    } else {
      ternPart = RIGHT;
    }
  }

  return ternPart;
}
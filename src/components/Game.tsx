import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Snake from './Snake';
import Food from './Food';
import { getRandomCoordinates } from '../utils/randomNum';

interface IGameProps {
}

interface IGameState {
  foodCords: number[];
  direction: string;
  snakeDots: Array<number[]>;
  moveSpeed: number;
}

const GameField = styled.div`
  width: 600px;
  height: 600px;
  border: 2px solid #000;
  position: relative;
`;

const initialState = {
  foodCords: getRandomCoordinates(),
  direction: 'RIGHT',
  moveSpeed: 200,
  snakeDots: [
    [0, 0],
    [0, 2],
    [0, 4],
  ]
};


export default class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps | Readonly<IGameProps>) {
    super(props);

    this.state  = initialState;
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    const { keyCode } = event; // ! It's Deprecated! Rewrite this to key.

    if (keyCode === 119 && this.state.direction !== 'DOWN') {
      this.setState({ direction: 'UP' });
    } else if (keyCode === 115 && this.state.direction !== 'UP') {
      this.setState({ direction: 'DOWN' });
    } else if (keyCode === 97 && this.state.direction !== 'RIGHT') {
      this.setState({ direction: 'LEFT' });
    } else if (keyCode === 100 && this.state.direction !== 'LEFT') {
      this.setState({ direction: 'RIGHT' });
    }
  }

  moveSnake = () => {
    const dots: Array<number[]> = Array.from(this.state.snakeDots);
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'UP':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0], head[1] - 2];
        break;
      case 'RIGHT':
        head = [head[0], head[1] + 2];
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({ snakeDots: dots });
  };

  gameOver = () => {
    alert(`Game over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  eanlargeSnake = () => {
    const snake = [...this.state.snakeDots];
    snake.unshift([]);
    this.setState({
      snakeDots: snake
    });
  }

  increaseSpeed = () => {
    if (this.state.moveSpeed > 10) {
      this.setState({
        moveSpeed: this.state.moveSpeed - 10
      });
    }
  }

  checkIfEat = () => {
    const [headTop, headLeft] = this.state.snakeDots[this.state.snakeDots.length - 1];
    const [foodTop, foodLeft] = this.state.foodCords;
    if (headTop === foodTop && headLeft === foodLeft) {
      this.setState({
        foodCords: getRandomCoordinates()
      })
      this.eanlargeSnake();
      this.increaseSpeed();
    }
  }

  checkIfCollapsed = () => {
    const snake = [...this.state.snakeDots];
    const [headTop, headLeft] = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      const [dotTop, dotLeft] = dot;
      if (headTop === dotTop && headLeft === dotLeft) {
        this.gameOver();
      }
    });
  }

  checkIfOutOfBorderes = () => {
    const [top, left] = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (top >= 100 || top < 0 || left >= 100 || left < 0) {
      this.gameOver();
    }
  }

  componentDidMount = () => {
    setInterval(this.moveSnake, this.state.moveSpeed);
    window.addEventListener('keypress', this.handleKeyDown);
  }

  componentDidUpdate = () => {
    this.checkIfOutOfBorderes();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  public render() {
    return (
      <GameField>
        <p>{this.state.direction}</p>
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.foodCords} />
      </GameField>
    );
  }
}

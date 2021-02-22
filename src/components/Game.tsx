import React from 'react';
import styled from 'styled-components';
import Snake from './Snake';
import Food from './Food';
import { getRandomCoordinates } from '../utils/utils';
import { variables } from '../variables';

const {
  UP,
  DOWN,
  RIGHT,
  LEFT,
  KEY_A,
  KEY_W,
  KEY_D,
  KEY_S,
  KEY_ESCAPE,
  STEP
} = variables;
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
  direction: RIGHT,
  moveSpeed: 100,
  snakeDots: [
    [0, 0],
    [0, 2],
    [0, 4],
    [0, 6],
    [0, 8],
    [0, 10],
    [0, 12],
    [0, 14],
    [0, 16],
    [0, 18],
    [0, 20],
    [0, 22],
    [0, 24],
    [0, 26],
    [0, 28]
  ]
};


export default class Game extends React.Component<IGameProps, IGameState> {
  interval: number;
  isStoped: boolean;

  constructor(props: IGameProps | Readonly<IGameProps>) {
    super(props);

    this.state  = initialState;

    this.interval = 0;
    this.isStoped = false;
  }
  handleKeyDown = (event: KeyboardEvent) => {
    const { code } = event;

    if (code === KEY_W && this.state.direction !== DOWN) {
      this.setState({ direction: UP });
    } else if (code === KEY_S && this.state.direction !== UP) {
      this.setState({ direction: DOWN });
    } else if (code === KEY_A && this.state.direction !== RIGHT) {
      this.setState({ direction: LEFT });
    } else if (code === KEY_D && this.state.direction !== LEFT) {
      this.setState({ direction: RIGHT });
    } else if (code === KEY_ESCAPE) {
      if (!this.isStoped) {
        this.isStoped = true;
        this.pouse();
      } else {
        this.isStoped = false;
        this.play();
      }
    }
  }

  moveSnake = () => {
    const dots: Array<number[]> = Array.from(this.state.snakeDots);
    let head = dots[dots.length - 1];
    const [top, left] = head;

    switch (this.state.direction) {
      case UP:
        head = [top - STEP, left];
        break;
      case DOWN:
        head = [top + STEP, left];
        break;
      case LEFT:
        head = [top, left - STEP];
        break;
      case RIGHT:
        head = [top, left + STEP];
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
      // ! this.increaseSpeed(); Допилить
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

  play = () => {
    this.interval = window.setInterval(this.moveSnake, this.state.moveSpeed);
  }

  pouse = () => {
    clearInterval(this.interval);
  }

  componentDidMount = () => {
    this.play();
    window.addEventListener('keydown', this.handleKeyDown);
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

import React from 'react';
import styled from 'styled-components';
import Snake from './Snake';
import Food from './Food';
import { getRandomCoordinates } from '../../utils/utils';
import { variables } from '../../variables';
import Axis from './Axis';

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
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  height: 600px;
  border: 2px solid rgba(255, 255, 255, .3)ы;
  background: #222;
  position: relative;
  box-shadow: 0 0 20px 0px rgba(255, 255, 255, .3);
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
  commandQueue: string[];
  grid: null[];

  constructor(props: IGameProps | Readonly<IGameProps>) {
    super(props);

    this.state  = initialState;

    this.interval = 0;
    this.isStoped = false;
    this.commandQueue = [];
    this.moveSnake = this.moveSnake.bind(this);
    this.grid = new Array(50).fill(null);
  }
  handleKeyDown = (event: KeyboardEvent) => {
    const { code } = event;
    const { direction } = this.state;

    if (code === KEY_W && direction !== DOWN) {
      this.commandQueue.push(UP);
    } else if (code === KEY_S && direction !== UP) {
      this.commandQueue.push(DOWN);
    } else if (code === KEY_A && direction !== RIGHT) {
      this.commandQueue.push(LEFT);
    } else if (code === KEY_D && direction !== LEFT) {
      this.commandQueue.push(RIGHT);
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

    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.shift() || '';
      this.setState({ direction: command })
      console.log(command);
    }

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
        moveSpeed: this.state.moveSpeed - 2
      });
      this.play();
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

  play = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = window.setInterval(this.moveSnake, this.state.moveSpeed);
  }

  pouse = () => {
    clearInterval(this.interval);
  }

  componentDidMount = () => {
    this.play();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate = () => {
    this.checkIfOutOfBorderes();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  public render() {
    return (
      <GameField>
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.foodCords} />
        <Axis direction={DOWN} quantity={this.grid} />
        <Axis direction={RIGHT} quantity={this.grid} />
      </GameField>
    );
  }
}

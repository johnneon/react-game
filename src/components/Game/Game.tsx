import React from 'react';
import styled from 'styled-components';
import Snake from './Snake';
import Food from './Food';
import Stone from './Stone';
import { getRandomCoordinates, randomColor } from '../../utils/utils';
import { variables } from '../../variables';
import Axis from './Axis';
import { GameContext } from '../../context/GameContext';
import { getGameState, saveGameState } from '../../utils/save';

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
  STEP,
  EASY_MODE,
  HARD_MODE,
  DEFAULT_SNAKE,
  GAME_STATE
} = variables;
interface IGameProps {
  togglePouse: VoidFunction;
  updateScore: VoidFunction;
  gameOver: VoidFunction;
  mode: string;
  skin: string;
  isChanged: boolean;
  startGame: (start: boolean) => void;
}

interface IGameState {
  foodCords: number[];
  stoneCords: Array<number[]>;
  direction: string;
  snakeDots: Array<number[]>;
  moveSpeed: number;
  snakeSkin: string;
}

type StyledProps = {
  fullScreen: boolean;
  isLightTheme: boolean;
}

const GameField = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props: StyledProps) => props.fullScreen ? 'calc(100vh - 128px)' : '600px'};
  height: ${(props: StyledProps) => props.fullScreen ? 'calc(100vh - 128px)' : '600px'};
  margin: 0 auto;
  border: 2px solid rgba(255, 255, 255, .3);
  background: ${(props: StyledProps) => props.isLightTheme ? '#ffffff' : '#222'};
  position: relative;
  box-shadow: 0 0 20px 0px rgba(255, 255, 255, .3);

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vw;
  }
`;

export default class Game extends React.Component<IGameProps, IGameState> {
  interval: number;
  isStoped: boolean;
  commandQueue: string[];
  grid: null[];
  initialState: {
    foodCords: number[];
    stoneCords: Array<number[]>;
    direction: string;
    snakeDots: Array<number[]>;
    moveSpeed: number;
    snakeSkin: string;
  }

  constructor(props: IGameProps | Readonly<IGameProps>) {
    super(props);

    this.initialState = {
      foodCords: getRandomCoordinates(),
      stoneCords: [],
      direction: UP,
      moveSpeed: 100,
      snakeSkin: DEFAULT_SNAKE,
      snakeDots: [
        [52,48],
        [50, 48],
        [48, 48],
      ]
    };

    this.state  = this.initialState;

    this.interval = 0;
    this.isStoped = false;
    this.commandQueue = [];
    this.moveSnake = this.moveSnake.bind(this);
    this.grid = new Array(50).fill(null);
  }

  static contextType = GameContext;

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
        this.props.togglePouse();
      } else {
        this.isStoped = false;
        this.play();
        this.props.togglePouse();
      }
    }
  }

  commandObserve = () => {
    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.shift() || '';
      this.setState({ direction: command })
    }
  }

  doMove = (head: number[], direction: string, mode: string): number[] => {
    const [top, left] = head;
    let newHead: number[] = [];

    switch (direction) {
      case UP:
        newHead = [top - STEP, left];
        break;
      case DOWN:
        newHead = [top + STEP, left];
        break;
      case LEFT:
        newHead = [top, left - STEP];
        break;
      case RIGHT:
        newHead = [top, left + STEP];
        break;
    }

    if (mode === EASY_MODE) {
      if (top >= 98 && direction === DOWN) {
        newHead = [0, left];
      }
      if (top < 2 && direction === UP) {
        newHead = [98, left];
      }
      if (left >= 98 && direction === RIGHT) {
        newHead = [top, 0];
      }
      if (left < 2 && direction === LEFT) {
        newHead = [top, 98];
      }
    }

    return newHead;
  }

  moveSnake = () => {
    const { direction, snakeDots } = this.state;
    const { mode } = this.props;
    const dots: Array<number[]> = Array.from(snakeDots);
    const head = dots[dots.length - 1];
    const newHead = this.doMove(head, direction, mode);

    dots.push(newHead);
    dots.shift();

    this.commandObserve();
    this.setState({ snakeDots: dots });
  };

  gameOver = () => {
    const { gameOver, startGame } = this.props;

    this.setState(this.initialState);
    gameOver();
    startGame(false);
  }

  reset = () => {
    this.setState(this.initialState);
  }

  eanlargeSnake = () => {
    const snake = [...this.state.snakeDots];

    snake.unshift([]);

    this.setState({
      snakeDots: snake
    });
  }

  increaseSpeed = () => {
    if (this.state.moveSpeed > 50) {
      this.setState({
        moveSpeed: this.state.moveSpeed - 2
      });
      this.play();
    }
  }

  checkIfEat = () => {
    const { snakeDots, foodCords } = this.state;
    const { mode, skin } = this.props;
    const [headTop, headLeft] = snakeDots[snakeDots.length - 1];
    const [foodTop, foodLeft] = foodCords;

    const checkCoordinates = () => {
      const [foodTop, foodLeft] = getRandomCoordinates();
      const check = snakeDots.find(([dotTop, dotLeft]) => dotTop === foodTop && dotLeft === foodLeft);

      if (check) {
        return getRandomCoordinates();
      }

      return [foodTop, foodLeft];
    }

    if (headTop === foodTop && headLeft === foodLeft) {
      this.setState({
        foodCords: checkCoordinates()
      });
      this.props.updateScore();
      this.eanlargeSnake();
      if (mode !== EASY_MODE) {
        this.increaseSpeed();
      }
      if (mode === HARD_MODE) {
        this.createStones();
      }
      if (skin !== DEFAULT_SNAKE) {
        this.setState({
          snakeSkin: randomColor()
        });
      } else {
        this.setState({
          snakeSkin: DEFAULT_SNAKE
        });
      }
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

  checkIfEatStone = () => {
    const { stoneCords, snakeDots } = this.state;
    const [headTop, headLeft] = snakeDots[snakeDots.length - 1];
    const check = stoneCords?.find(([stoneTop, stoneLeft]) => stoneTop === headTop && stoneLeft === headLeft);
    if (check) {
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
    window.addEventListener('keydown', this.handleKeyDown);

    try {
      const savedState = getGameState(GAME_STATE);
      if (savedState) {
        this.setState({
          ...savedState
        });
      }
    } catch (e) {
      return;
    }
  }

  componentWillUnmount = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate = (prevProps: IGameProps) => {
    if (prevProps.isChanged !== this.props.isChanged) {
      this.reset();
    }
    const { mode } = this.props;
    this.checkIfCollapsed();
    this.checkIfEat();
    if (mode !== EASY_MODE) {
      this.checkIfOutOfBorderes();
    }
    if (mode === HARD_MODE) {
      this.checkIfEatStone();
    }
    saveGameState(this.state, GAME_STATE);
  }

  createStones = () => {
    const { snakeDots } = this.state;
    
    const checkCoordinates = (): Array<number[]> => {
      let numOfStones = 1;

      if (snakeDots.length > 3 && snakeDots.length < 8) {
        numOfStones = 2;
      } else if (snakeDots.length > 8 && snakeDots.length < 15) {
        numOfStones = 3;
      } else if (snakeDots.length > 15 && snakeDots.length < 23) {
        numOfStones = 4;
      } else if (snakeDots.length > 22) {
        numOfStones = 5;
      }

      const stones = [];
      for (let i = 0; i < numOfStones; i++) {
        const [stoneTop, stoneLeft] = getRandomCoordinates();
        const check = snakeDots.find(([dotTop, dotLeft]) => dotTop === stoneTop && dotLeft === stoneLeft);
  
        if (check) {
          stones.push(getRandomCoordinates());
        }
        
        stones.push([stoneTop, stoneLeft]);
      }
      return stones;
    }

    this.setState({
      stoneCords: checkCoordinates()
    });
  };

  public render() {
    const { isLightTheme, isFullScreen, pouse } = this.context;
    const { snakeDots, foodCords, stoneCords, snakeSkin } = this.state;
    let stones;
    if (pouse) {
      this.pouse();
    } else {
      this.play();
    }

    if (stoneCords.length > 0) {
      stones = stoneCords.map((stone: number[], i) => {
        return <Stone key={i} dot={stone} />;
      });
    }

    return (
      <GameField className="game-board" isLightTheme={isLightTheme} fullScreen={isFullScreen}>
        <Snake skin={snakeSkin} isLightTheme={isLightTheme} snakeDots={snakeDots} />
        <Food dot={foodCords} />
        {stones}
        <Axis isLightTheme={isLightTheme} direction={DOWN} quantity={this.grid} />
        <Axis isLightTheme={isLightTheme} direction={RIGHT} quantity={this.grid} />
      </GameField>
    );
  }
}

import { createContext, useContext } from 'react';

export type IGameContent = {
  pouse: boolean,
  isLightTheme: boolean | null,
  isFullScreen: boolean | null,
  setFullScreen: any,
  endGame: boolean | null;
  score: number;
  toggleMenu: () => void,
  changeTheme: () => void,
  resetGame: () => void,
}

function noop() {}

export const GameContext = createContext<IGameContent>({
  score: 0,
  pouse: true,
  isLightTheme: null,
  isFullScreen: null,
  endGame: null,
  setFullScreen: noop,
  changeTheme: noop,
  toggleMenu: noop,
  resetGame: noop
});

export const useGameContext = () => useContext(GameContext)
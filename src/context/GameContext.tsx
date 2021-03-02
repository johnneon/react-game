import { createContext, useContext } from 'react';

export type IGameContent = {
  pouse: boolean,
  isLightTheme: boolean | null,
  isFullScreen: boolean | null,
  endGame: boolean | null;
  sound: boolean | null;
  score: number;
  setFullScreen: any,
  musik: any;
  eatSoundEffect: any;
  endSoundEffect: any;
  mode: string;
  changeMode: (modeName: string) => void;
  toggleMenu: () => void;
  changeTheme: () => void;
  resetGame: () => void;
  setSound: () => void;
}

function noop() {}

export const GameContext = createContext<IGameContent>({
  mode: '',
  score: 0,
  pouse: true,
  isLightTheme: null,
  isFullScreen: null,
  endGame: null,
  sound: null,
  setFullScreen: noop,
  changeTheme: noop,
  toggleMenu: noop,
  resetGame: noop,
  musik: noop,
  eatSoundEffect: noop,
  endSoundEffect: noop,
  setSound: noop,
  changeMode: noop,
});

export const useGameContext = () => useContext(GameContext)
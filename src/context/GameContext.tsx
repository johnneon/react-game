import { createContext, useContext } from 'react';

export type IGameContent = {
  pouse: boolean,
  endGame: boolean;
  isLightTheme: boolean | null,
  isFullScreen: boolean | null,
  sound: boolean | null;
  isGameStarted: boolean | null;
  score: number;
  setFullScreen: any,
  musik: any;
  eatSoundEffect: any;
  endSoundEffect: any;
  mode: string;
  skin: string,
  changeMode: (modeName: string) => void;
  changeSkin: (skin: string) => void;
  toggleMenu: () => void;
  changeTheme: () => void;
  resetGame: () => void;
  setSound: () => void;
  startGame: (start: boolean) => void;
}

function noop() {}

export const GameContext = createContext<IGameContent>({
  mode: '',
  skin: '',
  score: 0,
  pouse: true,
  isLightTheme: null,
  isFullScreen: null,
  endGame: false,
  sound: null,
  isGameStarted: null,
  setFullScreen: noop,
  changeTheme: noop,
  toggleMenu: noop,
  resetGame: noop,
  musik: noop,
  eatSoundEffect: noop,
  endSoundEffect: noop,
  setSound: noop,
  changeMode: noop,
  changeSkin: noop,
  startGame: noop
});

export const useGameContext = () => useContext(GameContext)
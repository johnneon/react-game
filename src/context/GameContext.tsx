import { createContext, useContext } from 'react';

export type IGameContent = {
  pouse: boolean,
  isLightTheme: boolean | null,
  isFullScreen: boolean | null,
  setFullScreen: any,
  changeTheme: () => void,
  toggleMenu: () => void,
}

function noop() {}

export const GameContext = createContext<IGameContent>({
  pouse: true,
  isLightTheme: null,
  isFullScreen: null,
  setFullScreen: noop,
  changeTheme: noop,
  toggleMenu: noop
});

export const useGameContext = () => useContext(GameContext)
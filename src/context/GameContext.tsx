import { createContext, useContext } from 'react';

export type IGameContent = {
  open: boolean,
  isLightTheme: boolean | null,
  isFullScreen: boolean | null,
  setFullScreen: any,
  changeTheme: () => void,
}

function noop() {}

export const GameContext = createContext<IGameContent>({
  open: true,
  isLightTheme: null,
  isFullScreen: null,
  setFullScreen: noop,
  changeTheme: noop,
});

export const useGameContext = () => useContext(GameContext)
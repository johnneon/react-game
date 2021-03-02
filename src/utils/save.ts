export interface IAppState {
  open: boolean,
  score: number,
  isLightTheme: boolean,
  sound: boolean,
  mode: string,
  skin: string,
}

export interface IGameState {
  foodCords: number[];
  stoneCords: Array<number[]>;
  direction: string;
  snakeDots: Array<number[]>;
  moveSpeed: number;
  snakeSkin: string;
}

export const saveAppState = (data: IAppState, storageName: string): void => {
  window.localStorage.setItem(storageName, JSON.stringify(data));
}

export const getAppState = (storageName: string): IAppState | null => {
  const data = window.localStorage.getItem(storageName);

  if (!data) {
    return null;
  }

  return JSON.parse(window.localStorage.getItem(storageName) || '{}');
}

export const saveGameState = (data: IGameState, storageName: string): void => {
  window.localStorage.setItem(storageName, JSON.stringify(data));
}

export const getGameState = (storageName: string): IGameState | null => {
  const data = window.localStorage.getItem(storageName);

  if (!data) {
    return null;
  }

  return JSON.parse(window.localStorage.getItem(storageName) || '{}');
}

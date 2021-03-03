import { variables } from '../variables';

const { SCORE } = variables;
export interface IAppState {
  open: boolean,
  score: number,
  isLightTheme: boolean,
  sound: boolean,
  mode: string,
  skin: string,
  isGameStarted: boolean;
}

export interface IGameState {
  foodCords: number[];
  stoneCords: Array<number[]>;
  direction: string;
  snakeDots: Array<number[]>;
  moveSpeed: number;
  snakeSkin: string;
}

export interface IScore {
  name: string;
  score: number;
}

export const saveAppState = (data: IAppState, storageName: string): void => {
  window.localStorage.setItem(storageName, JSON.stringify(data));
}

export const getAppState = (storageName: string): IAppState | null => {
  const data = window.localStorage.getItem(storageName);

  if (!data) {
    return null;
  }

  return JSON.parse(data || '{}');
}

export const saveGameState = (data: IGameState, storageName: string): void => {
  window.localStorage.setItem(storageName, JSON.stringify(data));
}

export const getGameState = (storageName: string): IGameState | null => {
  const data = window.localStorage.getItem(storageName);

  if (!data) {
    return null;
  }

  return JSON.parse(data || '{}');
}

export const getScore = (): IScore[] => {
  const data = window.localStorage.getItem(SCORE);

  if (!data) {
    return [];
  }

  return JSON.parse(data || '[]');
}

export const saveScore = (score: IScore) => {
  try {
    const prevScore: IScore[] = getScore();
    prevScore?.push(score);

    const sortedData = prevScore?.sort((a, b) => b.score - a.score);

    if (sortedData.length > 10) {
      console.log(sortedData);
      sortedData.splice(-1, 1);
    }

    window.localStorage.setItem(SCORE, JSON.stringify(sortedData));
  } catch (e) {
    console.log(e);
    return;
  }
}

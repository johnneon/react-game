import { useState } from 'react';
import useSound from 'use-sound';
import { PlayFunction } from 'use-sound/dist/types';

export interface IuseSoundControl {
  play: PlayFunction,
  pause: (id?: string | undefined) => void,
  stop: (id?: string | undefined) => void,
  setVolume: (value: number) => void;
  isPlaying: boolean;
}

export const useSoundControl =  (audioUrl: string): IuseSoundControl => {
  const [volume, setVolume] = useState<number>(.5);

  const [play, { pause, stop, isPlaying }] = useSound(audioUrl, {
    volume: volume
  });

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying
  };
}
import { useState } from 'react';
import useSound from 'use-sound';
import { PlayFunction } from 'use-sound/dist/types';

export interface IuseSoundControl {
  play: PlayFunction,
  pause: (id?: string | undefined) => void,
  stop: (id?: string | undefined) => void,
  setVolume: (value: number) => void;
  isPlaying: boolean;
  volume: number;
}

export const useSoundControl =  (audioUrl: string, loop?: boolean): IuseSoundControl => {
  const [volume, setVolume] = useState<number>(.5);
  const [playAgain, setplayAgain] = useState<boolean>(false);

  const options = {
    volume: volume,
    onend: () => {
      setplayAgain(true);
    }
  };
  
  const sound = useSound(audioUrl, options);
  const [play, { pause, stop, isPlaying }] = sound;

  if (loop) {
    if (playAgain) {
      stop();
      play();
      setVolume(volume);
      setplayAgain(false);
    }
  }

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying,
    volume
  };
}
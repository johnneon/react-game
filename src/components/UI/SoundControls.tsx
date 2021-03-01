import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import SliderControl from './SliderControl';
import { useGameContext } from '../../context/GameContext';

interface ISoundControlsProps {
}

const SoundControls: React.FunctionComponent<ISoundControlsProps> = (props) => {
  const { musik, eatSoundEffect, endSoundEffect } = useGameContext();
  
  const setEffectsVolume = (volume: number) => {
    eatSoundEffect.setVolume(volume);
    endSoundEffect.setVolume(volume);
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      item xs={12}
    >
      
      <SliderControl volume={musik.volume} setVolume={musik.setVolume}>
        Music
      </SliderControl>

      <SliderControl volume={eatSoundEffect.volume} setVolume={setEffectsVolume}>
        Game effects
      </SliderControl>

    </Grid>
  );
};

export default SoundControls;

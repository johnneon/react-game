import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import SliderControl from './SliderControl';
import { useGameContext } from '../../context/GameContext';

interface ISoundControlsProps {
}

const SoundControls: React.FunctionComponent<ISoundControlsProps> = (props) => {
  const { musik } = useGameContext();

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      item xs={12}
    >
      
      <SliderControl setVolume={musik.setVolume}>
        Music
      </SliderControl>

      <SliderControl>
        Game effects
      </SliderControl>

    </Grid>
  );
};

export default SoundControls;

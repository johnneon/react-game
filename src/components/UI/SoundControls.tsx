import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import SliderControl from './SliderControl';

interface ISoundControlsProps {
}

const SoundControls: React.FunctionComponent<ISoundControlsProps> = (props) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      item xs={12}
    >
      
      <SliderControl>
        Music
      </SliderControl>

      <SliderControl>
        Game effects
      </SliderControl>

    </Grid>
  );
};

export default SoundControls;

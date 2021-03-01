import React from 'react';
import {
  Grid,
  Slider,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Box
} from '@material-ui/core';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

interface ISliderControlProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.contrastText,
    },
    thumb: {
      backgroundColor: theme.palette.primary.contrastText,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    icon: {
      color: theme.palette.primary.contrastText,
      margin: '0 5px'
    },
    text: {
      color: theme.palette.primary.contrastText,
    },
    bar: {
      width: 200
    }
  })
);

const SliderControl: React.FunctionComponent<ISliderControlProps> = (props) => {
  const classes = useStyles();
  const percent = 100;

  const handleChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    props.setVolume(value as number / percent);
  };

  return (
    <Box>
    <Typography className={classes.text} id="non-linear-slider" gutterBottom>
      {props.children}
    </Typography>
    <Grid
      item
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.bar}
    >
      <Grid item>
        <VolumeDown className={classes.icon} />
      </Grid>
      <Grid item xs>
        <Slider
          value={props.volume * percent}
          onChange={handleChange}
          classes={{
            root: classes.root,
            thumb: classes.thumb,
            active: classes.active,
            valueLabel: classes.valueLabel
          }}
        />
      </Grid>
      <Grid item>
        <VolumeUp className={classes.icon} />
      </Grid>
    </Grid>
    </Box>
  );
};

export default SliderControl;

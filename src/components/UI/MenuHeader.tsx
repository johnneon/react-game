import React from 'react';
import {
  createStyles,
  makeStyles,
  Grid,
  Theme,
  Typography,
  IconButton,
} from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { useGameContext } from '../../context/GameContext';

interface IMenuHeaderProps {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullScreenBtn: {
      color: theme.palette.primary.contrastText,
      position: 'absolute',
      top: 0,
      right: 0
    },
    themeBtn: {
      color: theme.palette.primary.contrastText,
      position: 'absolute',
      top: 0,
      right: '48px'
    },
    soundBtn: {
      color: theme.palette.primary.contrastText,
      position: 'absolute',
      top: 0,
      right: '96px'
    },
    title: {
      paddingTop: 15,
      color: theme.palette.primary.contrastText
    }
  })
);

const MenuHeader: React.FunctionComponent<IMenuHeaderProps> = (props) => {
  const classes = useStyles();
  const {
    isFullScreen,
    setFullScreen,
    changeTheme,
    isLightTheme,
    musik
  } = useGameContext();
  const { play, pause, isPlaying } = musik;

  // ! Ты остановился на том что бы выключать музыку, и подумай как ее лучше протягивать через приложении, а то щас как то гавно
  
  return (
    <Grid item xs={12}>

      <Typography variant="h1" align="center" component="h2" className={classes.title}>
        {props.children}
      </Typography>

      <IconButton
        onClick={!isFullScreen ? setFullScreen?.enter : setFullScreen?.exit}
        className={classes.fullScreenBtn}
      >
        {!isFullScreen
        ? <FullscreenIcon />
        : <FullscreenExitIcon />}
      </IconButton>

      <IconButton
        onClick={!isPlaying ? play : pause}
        className={classes.soundBtn}
      >
        {!isPlaying
        ? <VolumeOffIcon />
        : <VolumeUpIcon />}
      </IconButton>

      <IconButton
        onClick={changeTheme}
        className={classes.themeBtn}
      >
        {!isLightTheme
        ? <Brightness5Icon />
        : <Brightness7Icon />}
      </IconButton>
      
      </Grid>
  );
};

export default MenuHeader;

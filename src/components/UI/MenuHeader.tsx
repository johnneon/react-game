import React from 'react';
import {
  createStyles,
  makeStyles,
  Grid,
  Theme,
  Typography,
  IconButton,
} from '@material-ui/core';
import {
  FullScreenHandle
} from "react-full-screen";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness7Icon from '@material-ui/icons/Brightness7';

interface IMenuHeaderProps {
  open: boolean;
  setFullScreen: FullScreenHandle;
  isFullScreen: boolean;
  isLightTheme: boolean;
  changeTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
    text: {
      color: theme.palette.primary.contrastText
    }
  })
);

const MenuHeader: React.FunctionComponent<IMenuHeaderProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>

      <Typography variant="h1" align="center" component="h2" className={classes.text}>
        Menu
      </Typography>

      <IconButton
        onClick={!props.isFullScreen ? props.setFullScreen.enter : props.setFullScreen.exit}
        className={classes.fullScreenBtn}
      >
        {!props.isFullScreen
        ? <FullscreenIcon />
        : <FullscreenExitIcon />}
      </IconButton>

      <IconButton
        onClick={props.changeTheme}
        className={classes.themeBtn}
      >
        {!props.isLightTheme
        ? <Brightness5Icon />
        : <Brightness7Icon />}
      </IconButton>
      
      </Grid>
  );
};

export default MenuHeader;

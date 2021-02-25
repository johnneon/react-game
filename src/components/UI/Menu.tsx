import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  Theme,
  Tooltip
} from '@material-ui/core';
import {
  FullScreenHandle
} from "react-full-screen";
import MenuHeader from './MenuHeader';
import RadioControls from './RadioControls';
import HelpIcon from '@material-ui/icons/Help';
interface IMenuProps {
  open: boolean;
  setFullScreen: FullScreenHandle;
  isFullScreen: boolean;
  isLightTheme: boolean;
  changeTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

type StyledProps = {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 3, 
      width: '100%',
      height: '100%',
      padding: '10px',
      background: theme.palette.secondary.main,
      transition: 'all .3s linear',
      visibility: (props: StyledProps) => props.open ? 'visible' : 'hidden',
      opacity: (props: StyledProps) => props.open ? 1 : 0,
    },
    iconBtn: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  })
);

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const classes = useStyles(props);
  const [gameMode, setGameMode] = useState<string>('easy');
  const [colorMode, setColorMode] = useState<string>('easy');

  const handleGameMode = (value: string) => {
    setGameMode(value);
  }

  const handleColorMode = (value: string) => {
    setColorMode(value);
  }

  const gameControls = [
    { value: "easy", label: "Easy" },
    { value: "normal", label: "Normal" },
    { value: "hard", label: "Hard" }
  ];
  const colorControls = [
    { value: "default", label: "Default" },
    { value: "colored", label: "Colored snake" }
  ];
  const text = 'Easy: Open borders, speed doesn`t increase. Normal: Close borders, increasing speed. Hard: Close borders, increasing speed, enemy items. After you WARNING!!! After changing the mode, the game will restart!';


  return (
    <Box className={classes.wrapper}>

      <Grid container spacing={3}>

        <MenuHeader
          open={props.open}
          setFullScreen={props.setFullScreen}
          isFullScreen={props.isFullScreen}
          changeTheme={props.changeTheme}
          isLightTheme={props.isLightTheme}
        />

        <RadioControls setValue={handleGameMode} value={gameMode} controls={gameControls}>
          Game mode - 
          <Tooltip title={text}>
            <HelpIcon />
          </Tooltip>
        </RadioControls>

        <RadioControls setValue={handleColorMode} value={colorMode} controls={colorControls}>
          Color mode
        </RadioControls>

      </Grid>

    </Box>
  );
};

export default Menu;

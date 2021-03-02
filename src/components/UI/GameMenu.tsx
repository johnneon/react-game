import React from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  Theme,
  Tooltip,
  Button
} from '@material-ui/core';
import MenuHeader from './MenuHeader';
import RadioControls from './RadioControls';
import HelpIcon from '@material-ui/icons/Help';
import { useGameContext } from '../../context/GameContext';
import { variables } from '../../variables';

const {
  GAME_SETTINGS_INFO,
  EASY_MODE,
  NORMAL_MODE,
  HARD_MODE,
  DEFAULT_SNAKE,
  COLORED_SNAKE
} = variables;

interface IGameMenuProps {
  goBack: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      color: theme.palette.primary.contrastText,
      margin: '0 auto 10px'
    }
  })
);

const GameMenu: React.FunctionComponent<IGameMenuProps> = (props) => {
  const { pouse, changeMode, mode, changeSkin, skin } = useGameContext();
  const classes = useStyles({ pouse });

  const gameControls = [
    { value: EASY_MODE, label: "Easy" },
    { value: NORMAL_MODE, label: "Normal" },
    { value: HARD_MODE, label: "Hard" }
  ];
  const colorControls = [
    { value: DEFAULT_SNAKE, label: "Default" },
    { value: COLORED_SNAKE, label: "Colored snake" }
  ];
  const text = GAME_SETTINGS_INFO;

  return (
    <Box>

      <Grid container spacing={3}>

        <MenuHeader>Game settings</MenuHeader>

        <RadioControls setValue={changeMode} value={mode} controls={gameControls}>
          Game mode - 
          <Tooltip title={text}>
            <HelpIcon />
          </Tooltip>
        </RadioControls>

        <RadioControls setValue={changeSkin} value={skin} controls={colorControls}>
          Color mode
        </RadioControls>

        <Button
            variant="outlined"
            color="inherit"
            className={classes.btn}
            onClick={props.goBack}
        >
          Back
        </Button>

      </Grid>

    </Box>
  );
};

export default GameMenu;

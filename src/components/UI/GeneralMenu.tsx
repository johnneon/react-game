import React from 'react';
import {
  Button,
  Grid,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core';
import MenuHeader from './MenuHeader';
import { useGameContext } from '../../context/GameContext';
import { variables } from '../../variables';

const {
  GAME_SETTINGS,
  SOUND_SETTINGS,
  SCORE
} = variables;
interface IGeneralMenuProps {
  changeMenu: (menuPage: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      color: theme.palette.primary.contrastText,
      marginBottom: 10
    }
  })
);

const GeneralMenu: React.FunctionComponent<IGeneralMenuProps> = (props) => {
  const classes = useStyles();
  const { toggleMenu } = useGameContext();

  const toSettings = (event: React.MouseEvent) => {
    props.changeMenu(GAME_SETTINGS);
  };
  const toSound = (event: React.MouseEvent) => {
    props.changeMenu(SOUND_SETTINGS);
  };
  const toScore = (event: React.MouseEvent) => {
    props.changeMenu(SCORE);
  };

  return (
      <Grid container spacing={3}>

        <MenuHeader>Menu</MenuHeader>

        <Grid item container direction="column" alignItems="center">
          <Button
            variant="outlined"
            color="inherit"
            className={classes.btn}
            onClick={toggleMenu}
          >
            Continue
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            className={classes.btn}
            onClick={toggleMenu}
          >
            New game
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            className={classes.btn}
            data-name="one"
            onClick={toSettings}
          >
            Game settings
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            className={classes.btn}
            onClick={toSound}
          >
            Sound settings
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            className={classes.btn}
            onClick={toScore}
          >
            Score
          </Button>
        </Grid>
      </Grid>
  );
};

export default GeneralMenu;

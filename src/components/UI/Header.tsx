import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Theme
} from '@material-ui/core';
import { useGameContext } from '../../context/GameContext';

interface IHeaderProps {
  toggleMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  score: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    color: theme.palette.primary.contrastText
  },
  wrapper: {
    backgroundColor: theme.palette.primary.main
  },
  text: {
    color: theme.palette.primary.contrastText
  }
}));

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { endGame } = useGameContext();
  const classes = useStyles();

  return (
      <AppBar className={classes.wrapper} position="static">

        <Toolbar>
          <IconButton
            className={classes.text}
            onClick={props.toggleMenu}
            disabled={endGame}
            edge="start"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Snake game
          </Typography>

          <Typography variant="h6" className={classes.text}>
            Score: {props.score}
          </Typography>

        </Toolbar>

      </AppBar>
  );
};

export default Header;

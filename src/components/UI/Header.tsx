import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

interface IHeaderProps {
  toggleMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const useStyles = makeStyles({
  wrapper: {
    background: '#222',
    color: 'white',
  }
});

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.wrapper} position="static">

      <Toolbar>
        <IconButton onClick={props.toggleMenu} edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Snake game
        </Typography>
      </Toolbar>

    </AppBar>
  );
};

export default Header;

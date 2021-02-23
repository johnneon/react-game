import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Game from './components/Game/Game';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Menu from './components/UI/Menu';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
  },
  gameWrap: {
    position: 'relative',
  }
});

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <Box className={classes.gameWrap}>

      <Header toggleMenu={toggleMenu} />

      <Box className={classes.gameWrap}>
        <Game pouse={open} togglePouse={toggleMenu} />
        <Menu open={open} />
      </Box>

      <Footer />

    </Box>
  );
}

export default App;

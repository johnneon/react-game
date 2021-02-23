import React, { useState, useCallback } from 'react';
import {
  FullScreen,
  useFullScreenHandle,
  FullScreenHandle
} from "react-full-screen";
import { Box, makeStyles } from '@material-ui/core';
import Game from './components/Game/Game';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Menu from './components/UI/Menu';

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    '@media(max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh'
    },
  },
  gameWrap: {
    position: 'relative',
  }
});

function App() {
  const classes = useStyles();
  const screen: FullScreenHandle = useFullScreenHandle();
  const [open, setOpen] = useState(true);
  const [score, setScore] = useState(0);
  const [fullScreen, setFullScreen] = useState(screen.active);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const updateScore = () => {
    setScore(score + 1);
  }

  const resetScore = () => {
    setScore(0);
  }

  const reportChange = useCallback((fullScreen, screen) => {
      setFullScreen(screen.active);
  }, []);

  return (
    <FullScreen handle={screen} onChange={reportChange}>
      <Box className={classes.wrapper}>

        <Header
          toggleMenu={toggleMenu}
          score={score}
        />

        <Box className={classes.gameWrap}>
          <Game
            pouse={open}
            togglePouse={toggleMenu}
            updateScore={updateScore}
            resetScore={resetScore}
            isFullScreen={fullScreen}
          />
          <Menu
            open={open}
            setFullScreen={screen}
            isFullScreen={fullScreen}
          />
        </Box>

        <Footer />

      </Box>
    </FullScreen>
  );
}

export default App;

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
import { CustomThemeProvider } from './themes/CustomThemeProvider';
import { GameContext } from './context/GameContext';
import { IuseSoundControl, useSoundControl } from './hooks/sound.hook';

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
  const [open, setOpen] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [fullScreen, setFullScreen] = useState<boolean>(screen.active);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(true);
  const musik: IuseSoundControl = useSoundControl('./audio/musik.mp3', true);
  const eatSoundEffect: IuseSoundControl = useSoundControl('./audio/eat.mp3');
  const endSoundEffect: IuseSoundControl = useSoundControl('./audio/lose.mp3');
  
  const toggleMenu = () => {
    setOpen(!open);

    if (open && sound) {
      musik.play();
    } else {
      musik.pause();
    }
  };

  const gameOver = () => {
    console.log(score);
    if (sound) {
      musik.stop();
      endSoundEffect.play();
    }
    setOpen(!open);
    setEndGame(!endGame);
  }

  const updateScore = () => {
    if (sound) {
      eatSoundEffect.play();
    }
    setScore(score + 1);
  }

  const resetGame = () => {
    setEndGame(!endGame);
    setScore(0);
  }

  const setTheme = () => {
    setIsLightTheme(!isLightTheme);
  }

  const reportChange = useCallback((fullScreen: boolean, screen: FullScreenHandle) => {
      setFullScreen(screen.active);
  }, []);

  const toggleSound = () => {
    setSound(!sound);
  }

  return (
    <CustomThemeProvider isLightTheme={isLightTheme}>
      <GameContext.Provider value={{
        pouse: open,
        toggleMenu: toggleMenu,
        isFullScreen: fullScreen,
        setFullScreen: screen,
        changeTheme: setTheme,
        isLightTheme,
        endGame,
        score,
        resetGame,
        musik,
        eatSoundEffect,
        endSoundEffect,
        setSound: toggleSound,
        sound
      }}>
      <FullScreen handle={screen} onChange={reportChange}>
        <Box className={`${classes.wrapper} app`}>
          {/* <button onClick={play}>play</button> */}

          <Header
            toggleMenu={toggleMenu}
            score={score}
          />

          <Box className={classes.gameWrap}>
            <Game
              togglePouse={toggleMenu}
              updateScore={updateScore}
              gameOver={gameOver}
            />
            <Menu />
          </Box>

          <Footer />

        </Box>
      </FullScreen>
      </GameContext.Provider>
    </CustomThemeProvider>
  );
}

export default App;

import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Game from './components/Game/Game';
import { DarkTheme } from './themes/DarkTheme';
import { LightTheme } from './themes/LightTheme';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center; 
`;

function App() {
  const [theme, setTheme] = useState(DarkTheme);
  
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Game />
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;

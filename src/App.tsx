import React from 'react';
import styled from 'styled-components';
import Game from './components/Game';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center; 
`;

function App() {
  return (
    <Wrapper>
      <Game />
    </Wrapper>
  );
}

export default App;

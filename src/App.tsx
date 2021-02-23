import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Game from './components/Game/Game';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';

const Wrapper = styled.div`
  position: relative;
`;

const useStyles = makeStyles({
  wrapper: {
    background: '#222',
    color: 'white',
  },
  sidebar: {
    position: 'absolute',
    width: 240,
  }
});

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Wrapper>

      <Header toggleSidebar={handleClick} />

      <Game />

      <Footer />

    </Wrapper>
  );
}

export default App;

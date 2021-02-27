import React from 'react';
import {
  Button,
  Grid,
} from '@material-ui/core';
import MenuHeader from './MenuHeader';

interface IGeneralMenuProps {
}

const GeneralMenu: React.FunctionComponent<IGeneralMenuProps> = (props) => {
  return (
      <Grid container spacing={3}>

        <MenuHeader>Menu</MenuHeader>

        <Grid item container direction="column" alignItems="center">
          <Button>Start game</Button>
          <Button>Game settings</Button>
          <Button>Sound settings</Button>
          <Button>Score</Button>
        </Grid>
      </Grid>
  );
};

export default GeneralMenu;

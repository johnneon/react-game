import React from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  Theme,
  Button
} from '@material-ui/core';
import MenuHeader from './MenuHeader';
import SoundControls from './SoundControls';
import { useGameContext } from '../../context/GameContext';

interface ISoundMenuProps {
  goBack: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      color: theme.palette.primary.contrastText,
      margin: '0 auto 10px'
    }
  })
);

const SoundMenu: React.FunctionComponent<ISoundMenuProps> = (props) => {
  const { pouse } = useGameContext();
  const classes = useStyles({ pouse });

  return (
    <Box>

      <Grid container spacing={3}>

        <MenuHeader>
          Sound settings
        </MenuHeader>

        <SoundControls />

        <Button
            variant="outlined"
            color="inherit"
            className={classes.btn}
            onClick={props.goBack}
        >
          Back
        </Button>

      </Grid>

    </Box>
  );
};

export default SoundMenu;

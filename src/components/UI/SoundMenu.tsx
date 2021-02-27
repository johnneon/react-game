import React from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  Theme,
} from '@material-ui/core';
import MenuHeader from './MenuHeader';
import SoundControls from './SoundControls';
import { useGameContext } from '../../context/GameContext';

interface IMenuProps {
}

type StyledProps = {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 3, 
      width: '100%',
      height: '100%',
      padding: '10px',
      background: theme.palette.secondary.main,
      transition: 'all .3s linear',
      visibility: (props: StyledProps) => props.open ? 'visible' : 'hidden',
      opacity: (props: StyledProps) => props.open ? 1 : 0,
    },
    iconBtn: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  })
);

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const { open } = useGameContext();
  const classes = useStyles({ open });

  return (
    <Box className={classes.wrapper}>

      <Grid container spacing={3}>

        <MenuHeader>
          Sound settings
        </MenuHeader>

        <SoundControls>
          Musik
        </SoundControls>

        <SoundControls>
          Game
        </SoundControls>

      </Grid>

    </Box>
  );
};

export default Menu;

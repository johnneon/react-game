import React from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  Theme,
} from '@material-ui/core';
import GeneralMenu from './GeneralMenu';
import { useGameContext } from '../../context/GameContext';

interface IMenuProps {
}

type StyledProps = {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  })
);

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const { open } = useGameContext();
  const classes = useStyles({ open });

  return (
    <Box className={classes.wrapper}>

      <Grid container spacing={3}>

        <GeneralMenu />

      </Grid>

    </Box>
  );
};

export default Menu;

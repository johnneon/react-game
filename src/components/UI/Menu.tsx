import React from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  Theme,
  Typography,
} from '@material-ui/core';

interface IMenuProps {
  open: boolean
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
    background: 'rgba(0, 0, 0, .7)',
    transition: 'all .3s linear',
    visibility: (props: StyledProps) => props.open ? 'visible' : 'hidden',
    opacity: (props: StyledProps) => props.open ? 1 : 0,
    }
  })
);

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const classes = useStyles(props);

  return (
    <Box className={classes.wrapper}>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" color="primary">
            Menu
          </Typography>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Menu;

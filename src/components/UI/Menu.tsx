import React from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  Theme,
  Typography,
  IconButton,
} from '@material-ui/core';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import {
  FullScreenHandle
} from "react-full-screen";

interface IMenuProps {
  open: boolean;
  setFullScreen: FullScreenHandle;
  isFullScreen: boolean;
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
          <IconButton
            onClick={!props.isFullScreen ? props.setFullScreen.enter : props.setFullScreen.exit}
          >
            <ZoomOutMapIcon style={{ color: '#fff' }} />
          </IconButton>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Menu;

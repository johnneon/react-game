import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '64px',
    background: '#222',
    color: 'white',
  },
  logo: {
    width: '75px'
  }
});

const Footer: React.FunctionComponent = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Link href="https://github.com/johnneon" color="inherit" target="_blank">
        @johnneon
      </Link>
      <Typography variant="body1">
        &copy; 2021
      </Typography>
      <Link className={classes.logo} href="#" variant="body2">
        <img src="assets/images/rs_school_js.svg" alt="The Rolling Scopes" />
      </Link>
    </Box>
  );
};

export default Footer;

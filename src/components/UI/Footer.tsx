import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '64px',
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    width: '75px'
  },
  text: {
    color: theme.palette.primary.contrastText
  }
}));

const Footer: React.FunctionComponent = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Link href="https://github.com/johnneon" className={classes.text} target="_blank">
        @johnneon
      </Link>
      <Typography variant="body1" className={classes.text}>
        &copy; 2021
      </Typography>
      <Link className={classes.logo} href="https://rs.school/js/" variant="body2">
        <img src="assets/images/rs_school_js.svg" alt="The Rolling Scopes" />
      </Link>
    </Box>
  );
};

export default Footer;

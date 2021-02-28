import {
  Typography,
  Theme,
  createStyles,
  makeStyles,
  Button,
  TextField,
  withStyles
} from '@material-ui/core';
import React from 'react';
import { useGameContext } from '../../context/GameContext';

interface IGameOverScreenProps {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      color: theme.palette.primary.contrastText,
      marginBottom: 10
    },
    btn: {
      color: theme.palette.primary.contrastText,
    }
  })
);

const CssTextField = withStyles((theme: Theme) => ({
  root: {
    marginBottom: 15,
    '& label.Mui-focused': {
      color: theme.palette.primary.contrastText,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.contrastText,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
}))(TextField);


const GameOverScreen: React.FunctionComponent<IGameOverScreenProps> = (props) => {
  const classes = useStyles();
  const { score, resetGame } = useGameContext();

  const handleClick = () => {
    resetGame();
  };

  return (
    <>
      <Typography className={classes.text} variant="h2">Game over</Typography>
      <Typography className={classes.text} variant="h3">Your score is {score}!</Typography>
      <CssTextField
        label="Enter your name"
      />
      <Button
        variant="outlined"
        color="inherit"
        className={classes.btn}
        onClick={handleClick}
      >
        Submit
      </Button>
    </>
  );
};

export default GameOverScreen;

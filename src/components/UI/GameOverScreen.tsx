import React, {useState} from 'react';
import {
  Typography,
  Theme,
  createStyles,
  makeStyles,
  Button,
  TextField,
  withStyles
} from '@material-ui/core';
import { useGameContext } from '../../context/GameContext';
import { saveScore } from '../../utils/save';

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
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = () => {
    const regex = /[a-zA-Z0-9]+/;
    if (name.length < 3 || name.length > 6 || !regex.test(name)) {
      setError(true);
    } else {
      resetGame();
      saveScore({ name, score });
    }
  };

  return (
    <>
      <Typography className={classes.text} variant="h2">Game over</Typography>
      <Typography className={classes.text} variant="h3">Your score is {score}!</Typography>
      <CssTextField
        label="Enter your name"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={name}
        helperText="Max lingth 6. Min length 3."
        error={error}
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

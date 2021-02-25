import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Grid,
  Theme,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import Checkbox from './Checkbox';


interface IColorModeControlsProps {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    legend: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
      textAlign: 'center'
    },
    root: {
      color: theme.palette.primary.contrastText,
      '&$focused': {
        color: theme.palette.primary.contrastText,
      },
    },
    focused: {}
  })
);

const ColorModeControls: React.FunctionComponent<IColorModeControlsProps> = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('default');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      item xs={12}
    >

      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          className={classes.legend}
          classes={{
            root: classes.root,
            focused: classes.focused
          }}
        >
          Color mode
        </FormLabel>
        
        <RadioGroup row value={value} onChange={handleChange}>

          <Checkbox value="default" label="Default" />

          <Checkbox value="colored" label="Colored snake" />

        </RadioGroup>
      </FormControl>
      
      </Grid>
  );
};

export default ColorModeControls;

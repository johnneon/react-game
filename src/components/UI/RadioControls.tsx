import React from 'react';
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


interface IRadioControlsProps {
  controls: Array<{
    label: string;
    value: string;
  }>
  value: string;
  setValue: (value: string) => void;
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

const RadioControls: React.FunctionComponent<IRadioControlsProps> = (props) => {
  const classes = useStyles();
  const { value, setValue } = props;

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
          { props.children }
        </FormLabel>
        
        <RadioGroup row value={value} onChange={handleChange}>

          {props.controls.map((control, i) => {
            return <Checkbox key={i} value={control.value} label={control.label} />;
          })}

        </RadioGroup>
      </FormControl>
      
      </Grid>
  );
};

export default RadioControls;

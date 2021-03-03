import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  FormControlLabel,
  Radio
} from '@material-ui/core';


interface ICheckboxProps {
  value: string;
  label: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      color: theme.palette.primary.contrastText,
    },
    root: {
      color: theme.palette.primary.contrastText,
      '&$checked': {
        color: theme.palette.primary.contrastText,
      },
    },
    checked: {}
  })
);

const Checkbox: React.FunctionComponent<ICheckboxProps> = (props) => {
  const classes = useStyles();
  const { value, label } = props;
  return (
    <FormControlLabel
      value={value}
      label={label}
      className={classes.text}
      labelPlacement="top"
      control={<Radio
        classes={{
          root: classes.root,
          checked: classes.checked
        }}
      />}
    />
  );
};

export default Checkbox;

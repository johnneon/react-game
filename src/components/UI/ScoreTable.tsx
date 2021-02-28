import React from 'react';
import {
  makeStyles,
  createStyles,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
  Paper,
  Box,
  Grid,
  Button,
  Theme,
  TableHead
} from '@material-ui/core';
import MenuHeader from './MenuHeader';

interface IScoreTableProps {
  goBack: () => void;
}

interface IScoreItem {
  name: 'Qwerty';
  mode: 'Easy';
  score: 20;
  _id: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      color: theme.palette.primary.contrastText,
      margin: '0 auto 10px'
    }
  })
);


const Easy = new Array(5).fill({
  name: 'Qwerty',
  mode: 'Easy',
  score: 20,
  _id: '123'
});
const Normal = new Array(5).fill({
  name: 'Qwerty',
  mode: 'Normal',
  score: 20,
  _id: '123'
});
const Hard = new Array(5).fill({
  name: 'Qwerty',
  mode: 'Hard',
  score: 20,
  _id: '123'
});

const ScoreTable: React.FunctionComponent<IScoreTableProps> = (props) => {
  const classes = useStyles();
  const easy: IScoreItem[] = [...Easy];
  const normal: IScoreItem[] = [...Normal];
  const hard: IScoreItem[] = [...Hard];

  return (
    <Box>

      <Grid container spacing={3}>

        <MenuHeader>Game settings</MenuHeader>

        <TableContainer component={Paper}>
          <Table size="small">
          <TableHead>
          <TableRow>
              <TableCell>Easy</TableCell>
              <TableCell>Normal</TableCell>
              <TableCell>Hard</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>

              {easy.map((row: IScoreItem, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                  {row.name} - {row.score}
                  </TableCell>
                </TableRow>
              ))}
              {normal.map((row: IScoreItem, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                  {row.name} - {row.score}
                  </TableCell>
                </TableRow>
              ))}
              {hard.map((row: IScoreItem, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                  {row.name} - {row.score}
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>

        <Button
            variant="outlined"
            color="inherit"
            className={classes.btn}
            onClick={props.goBack}
        >
          Back
        </Button>
      </Grid>

    </Box>


  );
};

export default ScoreTable;

import React from 'react';
import {
  makeStyles,
  createStyles,
  Box,
  Grid,
  Button,
  Theme,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import MenuHeader from './MenuHeader';
import { getScore, IScore } from '../../utils/save';

interface IScoreTableProps {
  goBack: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      color: theme.palette.primary.contrastText,
      margin: '0 auto 10px'
    },
    listItem: {
      color: theme.palette.primary.contrastText,
      borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
      display: 'flex',
      justifyContent: 'space-between',
      '&:last-child': {
        borderBottom: 0
      },
      '& .MuiListItemText-root': {
        flex: 'none'
      }
    }
  })
);
const ScoreTable: React.FunctionComponent<IScoreTableProps> = (props) => {
  const classes = useStyles();
  const data: IScore[] = getScore();

  return (
    <Box>

      <Grid container spacing={3}>

        <MenuHeader>Score</MenuHeader>

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <List dense={true}>
              {data.map((scoreItem, i) => {
                const { name, score } = scoreItem;
                return (
                <ListItem className={classes.listItem} key={i}>
                  <ListItemText
                    primary={`${name}:`}
                  />
                  <ListItemText
                    primary={`${score}`}
                  />
                </ListItem>
                );
              })}
            </List>
          
        </Grid>

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

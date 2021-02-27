import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  Theme,
} from '@material-ui/core';
import GeneralMenu from './GeneralMenu';
import GameMenu from './GameMenu';
import SoundMenu from './SoundMenu';
import ScoreTable from './ScoreTable';
import { useGameContext } from '../../context/GameContext';
import { variables } from '../../variables';

const {
  GENERAL,
  GAME_SETTINGS,
  SOUND_SETTINGS,
  SCORE
} = variables;

interface IMenuProps {
}

type StyledProps = {
  pouse: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 3, 
      width: '100%',
      height: '100%',
      padding: '10px',
      background: theme.palette.secondary.main,
      transition: 'all .3s linear',
      visibility: (props: StyledProps) => props.pouse ? 'visible' : 'hidden',
      opacity: (props: StyledProps) => props.pouse ? 1 : 0,
    },
    container: {
      height: '100%'
    }
  })
);

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const { pouse } = useGameContext();
  const classes = useStyles({ pouse });
  const [menu, setMenu] = useState<string>(GENERAL);

  const changeMenuHandler = (menuPage: string) => {
    setMenu(menuPage);
  }

  const backToGeneral = () => {
    setMenu(GENERAL);
  };

  const provider = (page: string) => {
    switch (page) {
      case GENERAL:
        return <GeneralMenu changeMenu={changeMenuHandler} />
      case GAME_SETTINGS:
        return <GameMenu goBack={backToGeneral} />
      case SOUND_SETTINGS:
        return <SoundMenu goBack={backToGeneral} />
      case SCORE:
        return <ScoreTable goBack={backToGeneral} />
    
      default:
        <GeneralMenu changeMenu={changeMenuHandler} />
        break;
    }
  }

  return (
    <Box className={classes.wrapper}>

      <Grid
        className={classes.container}
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
      >

        {provider(menu)}

      </Grid>

    </Box>
  );
};

export default Menu;

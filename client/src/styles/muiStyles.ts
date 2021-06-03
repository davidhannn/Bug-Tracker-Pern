import { makeStyles } from '@material-ui/core/styles';

export const authPageStyles = makeStyles((theme) => ({
  root: {
    padding: '1.5em 3em',
    width: '330px',
    margin: 'auto',
    marginTop: '16vH',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      margin: '0.5em 0.5em',
      padding: '1em',
    },
  },
}));

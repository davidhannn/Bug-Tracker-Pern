import { makeStyles } from '@material-ui/core/styles';

export const navStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const authPageStyles = makeStyles((theme) => ({
  root: {
    padding: '1.5em 3em',
    width: '500px',
    margin: 'auto',
    marginTop: '16vH',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      margin: '0.5em 0.5em',
      padding: '1em',
    },
  },
  inputField: {
    padding: '1.5rem',
    width: '450px',
    margin: 'auto',
  },
  submitButton: {
    padding: '1.5rem 1.5rem',
    width: '450px',
    margin: 'auto',
    backgroundColor: 'lightblue',
  },
}));

export const useHeaderStyles = makeStyles((theme) => ({
  root: {
    padding: '1em 0',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '0.5em 0.5em',
    },
  },
  headerPaper: {
    padding: '0.8em 1.5em',
    marginBottom: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    [theme.breakpoints.down('xs')]: {
      padding: '0.3em 0.5em',
      marginBottom: '0.5em',
    },
  },
  adminButtons: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: '',
  },
}));

export const useTableStyles = makeStyles(
  (theme) => ({
    table: {
      '& thead th': {
        fontWeight: '600',
        color: '#003d6a',
        backgroundColor: '#cce4f6',
      },
    },
    clickableCell: {
      '&:hover': {
        backgroundColor: theme.palette.primary.main + '15',
        cursor: 'pointer',
      },
    },
    scrollableTable: {
      '& thead th': {
        fontWeight: '600',
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.light,
      },
      overflowY: 'auto',
      maxHeight: '350px',
    },
    StyledTableCell: {
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    },
    StyledTableRow: {
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  }),
  { index: 1 }
);

export const useFormStyles = makeStyles((theme) => ({
  // formControlLabels: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   width: '80%',
  //   [theme.breakpoints.down('xs')]: {
  //     flexDirection: 'column',
  //     width: 'auto',
  //   },
  // },
  inputField: {
    marginBottom: '1rem',
  },
  submitButton: {
    width: '100%',
  },
}));

export const useHomePageStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '80%',
  },
  body: {
    width: '100%',
    padding: '2rem',
    marginTop: '2rem',
  },
}));

export const useBodyStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#cce4f6',
    height: '100vh',
    width: '100vw',
  },
}));

export const useBugPageStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '80%',
    height: '100vh',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
}));

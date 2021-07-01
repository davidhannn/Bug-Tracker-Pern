import { makeStyles, Theme } from '@material-ui/core/styles';
import { isAbsolute } from 'path';
import { isWhiteSpaceLike } from 'typescript';

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
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    right: '1rem',
    [theme.breakpoints.down('xs')]: {
      right: '0.1rem',
    },
  },
  avatar: {
    // color: theme.palette.getContrastText(deepOrange[500]),
    color: 'white',
    backgroundColor: '#3f51b5',
    borderStyle: 'solid',
    borderColor: '#FFF',
  },
  navWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: '0.1rem',
    color: 'white',
    fontSize: '1.25rem',
    [theme.breakpoints.down('xs')]: {
      left: '0.1rem',
    },
  },
}));

export const authPageStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: '1.5em 3em',
    marginTop: '5rem',
    height: '500px',
    width: '500px',
    margin: 'auto',
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
    marginBottom: '2rem',
  },
  submitButton: {
    padding: '1rem',
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
  buttonWrapper: {
    marginRight: '1rem',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
  },
  mobileWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
  },
  mobileDescription: {
    marginBottom: '0.5rem',
  },
  memberAvatars: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export const useSearchSortStyles = makeStyles(
  (theme) => ({
    inputWrapper: {
      display: 'flex',
      minWidth: '100%',
      justifyContent: 'space-between',
      marginBottom: '1.5em',
      marginTop: '1rem',
      [theme.breakpoints.down('xs')]: {
        marginBottom: '0.7em',
      },
    },
    searchBar: {
      width: '70%',
      [theme.breakpoints.down('xs')]: {
        width: '55%',
      },
    },
    sortBar: {
      width: '25%',
      [theme.breakpoints.down('xs')]: {
        width: '42%',
      },
    },
    flexWrapper: {
      display: 'flex',
      minWidth: '100%',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'flex-start',
        marginLeft: '0.2em',
      },
    },
  }),
  { index: 1 }
);

export const useTableStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: '1rem',
    },
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
  inputField: {
    marginBottom: '1rem',
  },
  submitButton: {
    width: '100%',
  },
  formControl: {
    width: '100%',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'row',
  },
  radioGroupForm: {
    marginTop: '0.8em',
    width: '100%',
  },
  radioGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  radioGroupLabel: {
    marginRight: '2em',
  },
  formControlLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      width: 'auto',
    },
  },
}));

export const useHomePageStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '1rem 0',
    [theme.breakpoints.down('xs')]: {
      padding: '0.2em 0.2em',
    },
  },
  body: {
    marginTop: '2rem',
    padding: '1.5rem',
  },
  projectsListTable: {},
  itemWrapper: {
    padding: '0.4em 0.3em',
    marginTop: '0.5em',
  },
  flexedWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.3em',
  },
  iconWrapper: {
    display: 'flex',
    width: '100px',
    justifyContent: 'space-between',
  },
  iconText: {
    verticalAlign: 'middle',
    display: 'inline-flex',
  },
}));

export const useBodyStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#e6f2fb',
    overflowY: 'auto',
    height: '100vh',
    // width: '100vw',
  },
  body: {
    margin: '0 auto',
    maxWidth: '1200px',
  },
}));

export const useBugPageStyles = makeStyles((theme) => ({
  // root: {
  //   margin: '0 auto',
  //   width: '80%',
  //   height: '100vh',
  // },
  root: {},
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2rem',
    padding: '2rem',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2rem',
  },
  buttonWrapper: {
    marginRight: '1rem',
  },
  details: {},
}));

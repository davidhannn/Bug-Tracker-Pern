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

export const useHeaderStyles = makeStyles((theme) => ({
  root: {
    padding: '1em 0',
    [theme.breakpoints.down('xs')]: {
      padding: '0.5em 0.5em',
    },
  },
  headerPaper: {
    padding: '0.8em 1.5em',
    marginBottom: '1em',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '0.3em 0.5em',
      marginBottom: '0.5em',
    },
  },
}));

export const useTableStyles = makeStyles(
  (theme) => ({
    table: {
      '& thead th': {
        fontWeight: '600',
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.light,
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

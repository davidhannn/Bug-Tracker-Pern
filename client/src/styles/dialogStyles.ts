import { makeStyles } from '@material-ui/core/styles';

export const useDialogStyles = makeStyles(
  (theme) => ({
    dialogWrapper: {
      padding: '1.5rem',
      marginBottom: '1rem',
      overflow: 'hidden',
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1000,
    },
    roundIconButton: {
      minWidth: 0,
      padding: '0.65em',
      borderRadius: '2em',
    },
  }),
  { index: 1 }
);

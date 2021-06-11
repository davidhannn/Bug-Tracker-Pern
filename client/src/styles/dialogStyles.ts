import { makeStyles } from '@material-ui/core/styles';

export const useDialogStyles = makeStyles(
  (theme) => ({
    dialogWrapper: {
      padding: 20,
      overflow: 'hidden',
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

import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(3),
      textTransform: 'uppercase',
      fontSize: 'larger',
      fontWeight: 'bold',
      marginTop: '10px',
      borderBottom: '1px solid',
      '@media print': {
        flexGrow: 0,
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
    position: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
    list: {
      marginTop: '0.5rem',
      marginBottom: 0,
    },
    header: {
      fontStyle: 'italic',
      fontWeight: 'normal',
      '@media print': {
        flexGrow: 0,
        maxWidth: '25%',
        flexBasis: '25%',
      },
    },
    listItem: {
      '@media print': {
        flexGrow: 0,
        maxWidth: '75%',
        flexBasis: '75%',
      },
    },
    role: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      '@media print': {
        flexGrow: 0,
        maxWidth: '75%',
        flexBasis: '75%',
      },
    },
    date: {
      textAlign: 'right',
      '@media print': {
        flexGrow: 0,
        maxWidth: '25%',
        flexBasis: '25%',
      },
    },
    fullWidth: {
      width: '100%',
    },
  }),
);

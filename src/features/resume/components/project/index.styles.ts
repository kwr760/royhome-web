import { createStyles, darken, Theme } from '@material-ui/core';
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
    project: {
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
    description: {
      '@media print': {
        flexGrow: 0,
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
    link: {
      color: darken(theme.palette.secondary.main, 0.4),
      '&:visited, :visited *': {
        color: theme.palette.secondary.main,
      },
    },
  }),
);

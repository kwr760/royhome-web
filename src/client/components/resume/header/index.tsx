import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { createStyles, Grid, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: '10px',
    },
    name: {
      fontSize: 'xx-large',
      fontWeight: 'bold',
      textAlign: 'center',
      order: 0,
      [theme.breakpoints.up('sm')]: {
        order: 4,
      },
    },
    contact: {
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: 'smaller',
      textAlign: 'center',
      order: 4,
      [theme.breakpoints.up('sm')]: {
        order: 8,
        textAlign: 'right',
      },
    },
    address: {
      marginTop: 'auto',
      marginBottom: 'auto',
      fontStyle: 'italic',
      fontSize: 'smaller',
      textAlign: 'center',
      order: 8,
      [theme.breakpoints.up('sm')]: {
        order: 0,
        textAlign: 'left',
      },
    },
    phone: {
      fontWeight: 'bolder',
    },
  }),
);

interface Props {
  name: string;
  address: string;
  email: string;
  phone: string;
  displayPhone: boolean;
}
const ResumeHeader: FunctionComponent<Props> = ({ name, address, email, phone, displayPhone }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={4} className={classes.name}>
        { name }
      </Grid>
      <Grid item xs={12} sm={4} className={classes.contact}>
        <div>
          <a href="mailto:{ contact.email }?Subject=In%20response%20to%20your%20resume" target="_top">
            { email }
          </a>
        </div>
        <div className={classes.phone}>{ displayPhone ? phone : 'Cell upon request' }</div>
      </Grid>
      <Grid item xs={12} sm={4} className={classes.address}>
        { address }
      </Grid>
    </Grid>
  );
};

export default ResumeHeader;

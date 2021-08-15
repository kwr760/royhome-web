import React, { FunctionComponent } from 'react';
import { Grid, Link } from '@material-ui/core';
import { HeaderPropType } from '../../../../types/prop/resume/header';
import { useStyles } from './index.styles';

const ResumeHeader: FunctionComponent<HeaderPropType> = ({ name, address, email, phone, displayPhone }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={4} className={classes.name}>
        { name }
      </Grid>
      <Grid item xs={12} sm={4} className={classes.contact}>
        <Link
          href="mailto:{ contact.email }?Subject=In%20response%20to%20your%20resume"
          target="_target"
          className={classes.email}
        >
          { email }
        </Link>
        <div className={classes.phone}>{ displayPhone ? phone : 'Cell upon request' }</div>
      </Grid>
      <Grid item xs={12} sm={4} className={classes.address}>
        { address }
      </Grid>
    </Grid>
  );
};

export default ResumeHeader;

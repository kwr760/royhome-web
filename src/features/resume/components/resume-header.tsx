import React, { FunctionComponent, memo } from 'react';
import { Grid, Link } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { styles } from '../styles/resume-header.styles';

interface Props {
  name: string;
  address: string;
  email: string;
  phone: string;
  displayPhone: boolean;
}
type HeaderProps = Props & WithStyles<typeof styles>;
const ResumeHeaderComponent: FunctionComponent<HeaderProps> = (
  { name, address, email, phone, displayPhone, classes },
) => {
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

export default memo(withStyles(styles)(ResumeHeaderComponent));

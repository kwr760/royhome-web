import React, { FunctionComponent, memo } from 'react';
import { Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { styles } from '../styles/resume-summary.styles';

interface Props {
  summary: string;
}
type SummaryProps = Props & WithStyles<typeof styles>;
const ResumeSummaryComponent: FunctionComponent<SummaryProps> = ({ summary, classes }) => {
  return (
    <Grid container>
      <Grid item sm={12} className={classes.title}>
        <div>Summary</div>
      </Grid>
      <Grid item>
        <div>
          { summary }
        </div>
      </Grid>
    </Grid>
  );
};

export default memo(withStyles(styles)(ResumeSummaryComponent));

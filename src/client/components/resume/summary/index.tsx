import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from './index.styles';

interface Props {
  summary: string;
}
const ResumeSummary: FunctionComponent<Props> = ({ summary }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item sm={12} className={classes.title}>
        <div>Summary</div>
      </Grid>
      <Grid item>
        <div className={classes.content}>
          { summary }
        </div>
      </Grid>
    </Grid>
  );
};

export default ResumeSummary;

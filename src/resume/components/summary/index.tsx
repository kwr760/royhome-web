import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { SummaryPropType } from '../../../types/prop/resume/summary';
import { useStyles } from './index.styles';

const ResumeSummary: FunctionComponent<SummaryPropType> = ({ summary }) => {
  const classes = useStyles();
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

export default ResumeSummary;

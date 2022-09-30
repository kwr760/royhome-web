import React, { FunctionComponent, memo } from 'react';
import dateFormat from 'dateformat';
import { Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { Education } from '../contracts/resume.models';
import { styles } from '../styles/resume-education.styles';

interface Props {
  education: Education[];
}
type EducationProps = Props & WithStyles<typeof styles>;
const ResumeEducationComponent: FunctionComponent<EducationProps> = ({ education, classes }) => {
  return (
    <Grid container>
      <Grid item sm={12} className={classes.title}>
        <div>Education</div>
      </Grid>
      {
        education.map((item) => {
          const { degree, school, graduation } = item;
          return (
            <Grid container key={school}>
              <Grid item sm={9} className={classes.school}>
                {degree}
                ,
                <i>{school}</i>
              </Grid>
              <Grid item sm={3} className={classes.date}>
                {dateFormat(graduation, 'mmmm yyyy', true)}
              </Grid>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default memo(withStyles(styles)(ResumeEducationComponent));

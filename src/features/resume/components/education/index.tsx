import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { EducationPropType } from '../../../../types/prop/resume/education';
import dateFormat from 'dateformat';
import { useStyles } from './index.styles';

const ResumeEducation: FunctionComponent<EducationPropType> = ({ education }) => {
  const classes = useStyles();

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

export default ResumeEducation;

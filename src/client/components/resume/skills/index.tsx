import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';

import { SkillGroupType } from '../../../../types/resume.types';
import { useStyles } from './index.styles';

interface Props {
  skillGroups: SkillGroupType[];
}
const ResumeSkills: FunctionComponent<Props> = ({ skillGroups }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item sm={12} className={classes.title}>
        <div>Skills</div>
      </Grid>
      {
        skillGroups.map((skillGroup) => {
          const { name, skills } = skillGroup;
          return (
            <Grid container key={name}>
              <Grid item className={classes.header} sm={3}>
                {name}
              </Grid>
              <Grid item className={classes.list} sm={9}>
                {skills.map((e) => e.name).join(', ')}
              </Grid>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default ResumeSkills;

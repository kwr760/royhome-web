import React, { FunctionComponent, memo } from 'react';
import { Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { SkillGroup } from '../contracts/resume.models';
import { styles } from '../styles/resume-skills.styles';

interface Props {
  skillGroups: SkillGroup[];
}
type SkillsProps = Props & WithStyles<typeof styles>;
const ResumeSkillsComponent: FunctionComponent<SkillsProps> = ({ skillGroups, classes }) => {
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

export default memo(withStyles(styles)(ResumeSkillsComponent));

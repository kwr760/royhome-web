import React, { FunctionComponent, memo } from 'react';
import { isEmpty } from 'lodash';
import dateFormat from 'dateformat';
import { Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { Experience } from '../contracts/resume.models';
import { styles } from '../styles/resume-experience.styles';

interface Props {
  experience: Experience[];
}
type ExperienceProps = Props & WithStyles<typeof styles>;
const ResumeExperienceComponent: FunctionComponent<ExperienceProps> = ({ experience, classes }) => {
  return (
    <Grid container>
      <Grid item sm={12} className={classes.title}>
        <div>Professional Experience</div>
      </Grid>
      {
        experience.map((item) => {
          const {
            title, company, startDate, endDate = null, description, bullets, tech,
          } = item;
          return (
            <Grid container key={company}>
              <Grid item className={classes.fullWidth}>
                <Grid container className={classes.position}>
                  <Grid item sm={8} className={classes.role}>
                    {`${title} at ${company}`}
                  </Grid>
                  <Grid item sm={4} className={classes.date}>
                    {`${dateFormat(startDate, 'mmmm yyyy', true)} -
                    ${endDate ? dateFormat(endDate, 'mmmm yyyy', true) : 'current'}`}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    {description.map((e) => (<p key={e.id}>{e.name}</p>))}
                    { isEmpty(bullets) ? ''
                      : (
                        <ul>
                          {bullets.map((e) => (<li key={e.id}>{ e.name }</li>))}
                        </ul>
                      )}
                    { (isEmpty(tech) || isEmpty(tech.skills)) ? ''
                      : (
                        <Grid container className={classes.list}>
                          <Grid item className={classes.header} sm={3}>Technology</Grid>
                          <Grid item sm={9} className={classes.listItem}>
                            {tech.skills.map((e) => e.name).join(', ')}
                          </Grid>
                        </Grid>
                      )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default memo(withStyles(styles)(ResumeExperienceComponent));

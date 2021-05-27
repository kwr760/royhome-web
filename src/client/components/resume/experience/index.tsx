import dateFormat from 'dateformat';
import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { isEmpty } from 'lodash';

import { ExperienceType } from '../../../../types/resume.types';
import { useStyles } from './index.styles';

interface Props {
  experience: ExperienceType[];
}
const ResumeExperience: FunctionComponent<Props> = ({ experience }) => {
  const classes = useStyles();

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
                <Grid container className={classes.justify}>
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

export default ResumeExperience;

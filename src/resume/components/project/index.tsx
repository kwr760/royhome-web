import React, { FunctionComponent } from 'react';
import { Grid, Link } from '@material-ui/core';
import { ProjectPropType } from '../../../types/prop/resume/project';
import dateFormat from 'dateformat';
import { useStyles } from './index.styles';

const ResumeProject: FunctionComponent<ProjectPropType> = ({ project }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={12} className={classes.title}>
        <div>Projects</div>
      </Grid>
      {
        project.map((item) => {
          const { name, url, description, startDate, endDate } = item;
          return (
            <Grid container key={name}>
              <Grid container key={`${name}-url`}>
                <Grid item sm={9} className={classes.project}>
                  <b>{name}</b>
                  {', '}
                  <Link
                    href={url}
                    target="_target"
                    className={classes.link}
                  >
                    <i>{url}</i>
                  </Link>
                </Grid>
                <Grid item sm={3} className={classes.date}>
                  {dateFormat(startDate, 'mmmm yyyy', true)}{' - '}
                  {endDate ? dateFormat(endDate, 'mmmm yyyy', true) : 'current' }
                </Grid>
              </Grid>
              <Grid container key={`${name}-description`}>
                <Grid item className={classes.description}>
                  {description}
                </Grid>
              </Grid>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default ResumeProject;

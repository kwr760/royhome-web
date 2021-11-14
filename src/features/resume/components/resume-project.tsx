import React, { FunctionComponent, memo } from 'react';
import dateFormat from 'dateformat';
import { Grid, Link } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';
import { ProjectType } from '../types/object/resume';
import { styles } from '../styles/resume-project.styles';

interface Props {
  project: ProjectType[];
}
type ProjectProps = Props & WithStyles<typeof styles>;
const ResumeProjectComponent: FunctionComponent<ProjectProps> = ({ project, classes }) => {
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

export default memo(withStyles(styles)(ResumeProjectComponent));

import React, { FunctionComponent, memo } from 'react';
import { Container } from '@mui/material';
import { withStyles } from '@mui/styles';
import type { WithStyles } from '@mui/styles';

import { styles } from '../styles/resume-page.styles';
import ResumeHeader from './resume-header';
import ResumeSkills from './resume-skills';
import ResumeSummary from './resume-summary';
import ResumeExperience from './resume-experience';
import ResumeEducation from './resume-education';
import ResumeProject from './resume-project';
import { Education, Experience, Project, Resume, SkillGroup } from '../contracts/resume.models';

interface Props {
  resume?: Resume;
}
type PageProps = Props & WithStyles<typeof styles>;
const ResumePageComponent: FunctionComponent<PageProps> = ({ resume = {} as Resume, classes}) => {
  const {
    name = '',
    address = '',
    summary = '',
    email = '',
    phone = '',
    displayPhone = false,
    skillGroups = [] as SkillGroup[],
    experience = [] as Experience[],
    education = [] as Education[],
    project = [] as Project[],
  } = resume;

  return (
    <Container className={classes.container}>
      <ResumeHeader name={name} address={address} email={email} phone={phone} displayPhone={displayPhone} />
      <ResumeSummary summary={summary} />
      <ResumeSkills skillGroups={skillGroups} />
      <ResumeExperience experience={experience} />
      <ResumeEducation education={education} />
      <ResumeProject project={project} />
    </Container>
  );
};

export default memo(withStyles(styles)(ResumePageComponent));

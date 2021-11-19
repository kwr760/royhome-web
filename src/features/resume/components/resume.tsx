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
import { EducationType, ExperienceType, ProjectType, ResumeType, SkillGroupType } from '../contracts/resume.models';

interface Props {
  resume?: ResumeType;
}
type PageProps = Props & WithStyles<typeof styles>;
const ResumePageComponent: FunctionComponent<PageProps> = ({ resume = {} as ResumeType, classes}) => {
  const {
    name = '',
    address = '',
    summary = '',
    email = '',
    phone = '',
    displayPhone = false,
    skillGroups = [] as SkillGroupType[],
    experience = [] as ExperienceType[],
    education = [] as EducationType[],
    project = [] as ProjectType[],
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

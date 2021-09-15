import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import { ResumePropType } from '../../../types/prop/resume/resume';
import {
  EducationType,
  ExperienceType,
  ResumeType,
  SkillGroupType,
  ProjectType,
} from '../../../types/object/resume';

import ResumeHeader from '../header';
import ResumeSkills from '../skills';
import ResumeSummary from '../summary';
import ResumeExperience from '../experience';
import ResumeEducation from '../education';
import ResumeProject from '../project';
import { useStyles } from './index.styles';

const ResumePage: FunctionComponent<ResumePropType> = ({ resume = {} as ResumeType}) => {
  const classes = useStyles();

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
    <Container className={classes.grid}>
      <ResumeHeader name={name} address={address} email={email} phone={phone} displayPhone={displayPhone} />
      <ResumeSummary summary={summary} />
      <ResumeSkills skillGroups={skillGroups} />
      <ResumeExperience experience={experience} />
      <ResumeEducation education={education} />
      <ResumeProject project={project} />
    </Container>
  );
};

export default ResumePage;

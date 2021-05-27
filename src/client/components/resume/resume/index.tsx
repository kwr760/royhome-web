import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import {
  EducationType,
  ExperienceType,
  ResumeType,
  SkillGroupType,
} from '../../../../types/resume.types';

import ResumeHeader from '../header';
import ResumeSkills from '../skills';
import ResumeSummary from '../summary';
import ResumeExperience from '../experience';
import ResumeEducation from '../education';
import { useStyles } from './index.styles';

interface Props {
  resume: ResumeType;
}
const ResumePage: FunctionComponent<Props> = ({ resume = {} as ResumeType}) => {
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
  } = resume;

  return (
    <Container className={classes.container}>
      <ResumeHeader name={name} address={address} email={email} phone={phone} displayPhone={displayPhone} />
      <ResumeSummary summary={summary} />
      <ResumeSkills skillGroups={skillGroups} />
      <ResumeExperience experience={experience} />
      <ResumeEducation education={education} />
    </Container>
  );
};

export default ResumePage;

import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import ResumeExperience from '../../../../src/features/resume/components/resume-experience';
import { ExperienceType } from '../../../../src/features/resume/contracts/resume.models';
import { themeLight } from '../../../../src/theme-light';

describe('features/resume/components/resume-experience', () => {
  it('should render', () => {
    // Arrange
    const experiences = [{
      title: 'title 1',
      company: 'company 1',
      startDate: '2020-02-01',
      description: [{
        id: '1',
        name: 'description 1',
      }],
      bullets: [],
      techs: [],
    }, {
      title: 'title 2',
      company: 'company 2',
      startDate: '2010-01-01',
      endDate: '2020-01-01',
      description: [{
        id: '1',
        name: 'description 2',
      }],
      bullets: [{
        id: '2',
        name: 'bullet #1',
      }, {
        id: '3',
        name: 'bullet #2',
      }],
      tech: {
        name: 'Tech',
        skills: [{
          name: 'tech #1',
        }, {
          name: 'tech #2',
        }]},
    }] as ExperienceType[];

    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <ResumeExperience experience={experiences} />
      </ThemeProvider>,
    );

    // Assert
    getByText('Professional Experience');
    getByText('title 1 at company 1');
    getByText('February 2020 - current');
    getByText('description 1');
    getByText('title 2 at company 2');
    getByText('January 2010 - January 2020');
    getByText('description 2');
    getByText('bullet #1');
    getByText('bullet #2');
    getByText('tech #1, tech #2');
  });
  it('should render without props', () => {
    // Arrange / Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <ResumeExperience experience={[] as ExperienceType[]}/>
      </ThemeProvider>,
    );

    // Assert
    getByText('Professional Experience');
  });
});

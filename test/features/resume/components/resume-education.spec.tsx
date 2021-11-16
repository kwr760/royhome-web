import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import ResumeEducation from '../../../../src/features/resume/components/resume-education';
import { EducationType } from '../../../../src/features/resume/contracts/resume.models';
import theme from '../../../../src/theme-light';

describe('features/resume/components/resume-education', () => {
  it('should render', () => {
    // Arrange
    const education = [{
      degree: 'degree',
      school: 'school',
      graduation: '2020-01-01',
    }];

    // Act
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResumeEducation education={education} />
      </ThemeProvider>,
    );

    // Assert
    getByText('degree,');
    getByText('school');
    getByText('January 2020');
  });
  it('should render without props', () => {
    // Arrange / Act
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResumeEducation education={[] as EducationType[]}/>
      </ThemeProvider>,
    );

    // Assert
    getByText('Education');
  });
});

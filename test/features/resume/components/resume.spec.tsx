import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import ResumePageComponent from '../../../../src/features/resume/components/resume';
import { Resume } from '../../../../src/features/resume/contracts/resume.models';
import { themeLight } from '../../../../src/theme-light';

describe('features/resume/components/resume-page', () => {
  it('should render', () => {
    // Arrange
    const resume = {
      phone: 'phone',
      email: 'email',
      displayPhone: false,
      address: 'address',
      name: 'name',
    } as Resume;

    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <ResumePageComponent resume={resume} />
      </ThemeProvider>,
    );

    // Assert
    getByText('address');
    getByText('email');
    getByText('name');
    getByText(/Summary/);
    getByText(/Skills/);
    getByText('Professional Experience');
    getByText('Education');
  });
  it('should render with empty object', () => {
    // Arrange
    const resume = undefined;
    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <ResumePageComponent resume={resume}/>
      </ThemeProvider>,
    );

    // Assert
    getByText('Cell upon request');
    getByText(/Summary/);
    getByText('Skills');
    getByText('Professional Experience');
    getByText('Education');
  });
});

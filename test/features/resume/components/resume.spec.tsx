import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import { ResumeType } from '../../../../src/features/resume/types/object/resume';
import Resume from '../../../../src/features/resume/components/resume';
import theme from '../../../../src/theme-light';

describe('features/resume/components/resume-page', () => {
  it('should render', () => {
    // Arrange
    const resume = {
      phone: 'phone',
      email: 'email',
      displayPhone: false,
      address: 'address',
      name: 'name',
    } as ResumeType;

    // Act
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Resume resume={resume} />
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
    // Arrange // Act
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Resume />
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

import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import ResumeSummary from '../../../../src/features/resume/components/resume-summary';
import theme from '../../../../src/theme-light';

describe('feature/resume/components/resume-summary', () => {
  it('should render', () => {
    // Arrange
    const summary = 'summary';

    // Act
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResumeSummary summary={summary} />
      </ThemeProvider>,
    );

    // Assert
    getByText(/summary/);
  });
  it('should render without props', () => {
    // Arrange
    const summary = '';

    // Act
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResumeSummary summary={summary}/>
      </ThemeProvider>,
    );

    // Assert
    getByText(/Summary/);
  });
});

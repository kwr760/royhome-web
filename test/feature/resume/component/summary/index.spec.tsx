import React from 'react';
import { render } from '@testing-library/react';

import ResumeSummary from '../../../../../src/feature/resume/component/summary';

describe('feature/resume/componentsummary', () => {
  it('should render', () => {
    // Arrange
    const summary = 'summary';

    // Act
    const { getByText } = render(
      <ResumeSummary summary={summary} />,
    );

    // Assert
    getByText(/summary/);
  });
  it('should render without props', () => {
    // Arrange
    const summary = '';

    // Act
    const { getByText } = render(
      <ResumeSummary summary={summary}/>,
    );

    // Assert
    getByText(/Summary/);
  });
});

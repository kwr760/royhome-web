import React from 'react';
import { render } from '@testing-library/react';

import Privacy from '../../src/components/privacy';

jest.mock('react-markdown', () => ({children}: {children: unknown}) => children);

describe('components/privacy', () => {
  it('should render', () => {
    // Arrange // Act
    const { getByText } = render(
      <Privacy />,
    );

    // Assert
    getByText(/mocked file/);
  });
});

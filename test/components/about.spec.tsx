import React from 'react';
import { render } from '@testing-library/react';

import About from '../../src/components/about';

jest.mock('react-markdown', () => ({children}: {children: unknown}) => children);

describe('components/about', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <About />,
    );

    // Assert
    getByText(/mocked file/);
  });
});

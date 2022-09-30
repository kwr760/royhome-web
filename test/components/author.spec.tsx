import React from 'react';
import { render } from '@testing-library/react';

import Author from '../../src/components/author';

jest.mock('react-markdown', () => ({children}: {children: unknown}) => children);

describe('components/author', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Author />,
    );

    // Assert
    getByText(/mocked file/);
  });
});

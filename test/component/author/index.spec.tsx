import React from 'react';
import { render } from '@testing-library/react';

import Author from '../../../src/component/author';

describe('component/author', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Author />,
    );

    // Assert
    getByText(/mocked file/);
  });
});

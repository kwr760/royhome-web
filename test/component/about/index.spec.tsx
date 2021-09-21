import React from 'react';
import { render } from '@testing-library/react';

import About from '../../../src/component/about';

describe('component/about', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <About />,
    );

    // Assert
    getByText(/mocked file/);
  });
});
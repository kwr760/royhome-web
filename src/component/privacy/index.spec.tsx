import React from 'react';
import { render } from '@testing-library/react';

import Privacy from './index';

describe('component/privacy', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Privacy />,
    );

    // Assert
    getByText(/mocked file/);
  });
});

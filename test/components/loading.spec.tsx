import React from 'react';
import { render } from '@testing-library/react';

import Loading from '../../src/components/loading';

describe('components/loading', () => {
  it('renders without crashing', () => {
    // Arrange/Act
    const { getByAltText } = render(
      <Loading />,
    );

    // Assert
    getByAltText(/Loading/);
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import Index from './index';

describe('client/components/tictactoe', () => {
  it('should render', () => {
    // Arrange/Act
    const { queryByRole } = render(
      <Index />,
    );

    // Assert - fake test - test nothing
    queryByRole(/Tic-Tac-Toe/);
  });
});

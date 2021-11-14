import React from 'react';
import { render } from '@testing-library/react';
import Index from '../../../../src/features/tictactoe/components';

jest.mock('../../../../src/features/tictactoe/components/game-board',
  () => jest.fn(() => 'Game Board'),
);
jest.mock( '../../../../src/features/tictactoe/components/game-header',
  () => jest.fn(() => 'Game Header'),
);
jest.mock( '../../../../src/features/tictactoe/components/game-footer',
  () => jest.fn(() => 'Game Footer'),
);

describe('features/tictactoe/components', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(<Index />);

    // Assert - fake test - test nothing
    getByText(/Game Board/);
    getByText(/Game Header/);
    getByText(/Game Footer/);
  });
});

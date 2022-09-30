import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import Main from '../src/index-node';

jest.mock('../src/App', () => jest.fn(() => <div>App</div>));

describe('src/client/index-node', () => {
  const mockStore = configureMockStore([thunk]);
  it('launches the App', () => {
    // Arrange
    const state = {
      session: {
        isLoading: true,
      },
      resume: {
        resumes: {},
      },
    };
    const store = mockStore(state);

    // Act
    const { getByText } = render(<Main store={store} />);

    // Assert
    getByText(/App/);
  });
});

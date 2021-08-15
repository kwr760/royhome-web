import { AxiosResponse } from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { callApi } from '../../../util/api/call-api';

import DarkButton from './index';
import { DarkModes } from '../../../store/session/session.constants';

jest.mock('react-icons/fi');
jest.mock('../../../util/api/call-api');

describe('src/client/components/page/dark-mode', () => {
  const mockStore = configureMockStore([thunk]);
  const actionType = 'session/updateSession';
  const getComponent = (store: Store) => (
    <Provider store={store}>
      <DarkButton />
    </Provider>
  );
  it('renders in light mode', async () => {
    // Arrange
    const darkMode = DarkModes.LIGHT_MODE;
    const state = {
      session: {
        darkMode,
      },
    };
    const response = {
      data: {
        output: {
          darkMode,
        },
      },
    } as AxiosResponse;
    const expectedPayload = {
      session: {
        authenticated: false,
        darkMode,
      },
    };
    const store = mockStore(state);
    (callApi as jest.Mock).mockReturnValue(response);
    (FiSun as jest.Mock).mockImplementation(() => 'FiSun');

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    const actions = store.getActions();
    await fireEvent.click(getByRole('button'));

    // Assert
    getByText(/FiSun/);

    expect(actions.length).toEqual(1);
    expect(actions[0].type).toEqual(actionType);
    expect(actions[0].payload).toEqual(expectedPayload);
  });
  it('renders in dark mode', async () => {
    // Arrange
    const darkMode = DarkModes.DARK_MODE;
    const state = {
      session: {
        darkMode,
      },
    };
    const response = {
      data: {
        output: {
          darkMode,
        },
      },
    } as AxiosResponse;
    const expectedPayload = {
      session: {
        authenticated: false,
        darkMode,
      },
    };
    const store = mockStore(state);
    (callApi as jest.Mock).mockReturnValue(response);
    (FiMoon as jest.Mock).mockImplementation(() => 'FiMoon');

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    const actions = store.getActions();
    await fireEvent.click(getByRole('button'));

    // Assert
    getByText(/FiMoon/);
    expect(actions.length).toEqual(1);
    expect(actions[0].type).toEqual(actionType);
    expect(actions[0].payload).toEqual(expectedPayload);
  });
});

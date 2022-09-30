import { AxiosResponse } from 'axios';
import type { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { callApi } from '../../../src/util/api/call-api';
import { DarkModes } from '../../../src/contracts/constants/session.constants';
import {
  updateAuthentication,
  updateDarkMode,
  updateLoading,
  setLoading,
  clearLoading,
  saveSession, sessionReducer,
} from '../../../src/store/session/session.slice';
import logger from '../../../src/util/logger/browser';
import { Session } from '../../../src/contracts/session.models';

jest.mock('../../../src/util/api/call-api');
jest.mock('../../../src/util/logger/browser');

describe('store/session/session.slice', () => {
  const mockStore = configureMockStore([thunk]);
  const initialState: Session = {
    authenticated: false,
    expiration: 0,
    isLoading: false,
    darkMode: DarkModes.CLEAR_MODE,
  } as Session;

  it('should call updateAuthentication', () => {
    // Arrange
    const action = {
      authenticated: true,
      expiration: 1000,
    };
    const expected = {
      authenticated: true,
      expiration: 1000,
      isLoading: false,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, updateAuthentication(action));

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call setLoading', () => {
    // Arrange
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: true,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, setLoading());

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call updateDarkMode', async () => {
    // Arrange
    const darkMode = DarkModes.DARK_MODE;
    const expectedSession = {
      session: {
        authenticated: false,
        darkMode,
      },
    };
    const response = {
      data: {
        output: {
          darkMode,
        },
      },
    };
    const store = mockStore();
    (callApi as jest.Mock).mockReturnValue(response);

    // Act
    await store.dispatch(updateDarkMode(darkMode) as unknown as AnyAction);
    const actions = store.getActions();
    const newState = sessionReducer(store.getState() as Session, actions[0]);

    // Assert
    expect(actions[0].type).toEqual('session/updateSession');
    expect(actions[0].payload).toEqual(expectedSession);
    expect(newState).toEqual(expectedSession.session);
  });
  it('should call updateDarkMode - failure', async () => {
    // Arrange
    const darkMode = DarkModes.DARK_MODE;
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();
    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await store.dispatch(updateDarkMode(darkMode) as unknown as AnyAction);

    // Assert
    expect(logger.error).toHaveBeenCalledWith(expected);
  });
  it('should call clearLoading', () => {
    // Arrange
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: false,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, clearLoading());

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call updateLoading', () => {
    // Arrange
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: true,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, updateLoading(true));

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call saveSession',  async () => {
    // Arrange
    const user = {
      email: 'person@email.com',
    };
    const claim = {
      authenticated: true,
      expiration: 10000000000000,
      email: 'person@email.com',
      darkMode: 'dark-mode',
      context: '"context"',
      user,
    };
    const expectedSession = {
      session: {
        ...claim,
      },
      user,
    };
    const response = {
      data: {
        output: {
          ...claim,
          user,
        },
      },
    } as AxiosResponse;
    const store = mockStore();
    (callApi as jest.Mock).mockReturnValue(response);

    // Act
    await store.dispatch(saveSession(claim, user) as unknown as AnyAction);
    const actions = store.getActions();
    const newState = sessionReducer(store.getState() as Session, actions[0]);

    // Assert
    expect(actions[0].type).toEqual('session/updateSession');
    expect(actions[0].payload).toEqual(expectedSession);
    expect(newState).toEqual(expectedSession.session);
  });
  it('should call saveSession - failure',  async () => {
    // Arrange
    const claim = {
      authenticated: true,
      expiration: 1000,
      email: 'person@email.com',
      darkMode: 'dark-mode',
      context: '"context"',
    };
    const user = {};
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();
    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await store.dispatch(saveSession(claim, user) as unknown as AnyAction);

    // Assert
    expect(logger.error).toHaveBeenCalledWith(expected);
  });
});

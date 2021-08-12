import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SessionStateType } from '../../../types/state/session';
import { callApi } from '../../util/api/call-api';
import { DarkModes } from './session.constants';
import sessionReducer, {
  updateAuthentication,
  updateDarkMode,
  updateLoading,
  setLoading,
  clearLoading,
  saveSession,
} from './session.slice';

jest.mock('../../util/api/call-api');

describe('client/store/session/session.slice', () => {
  const mockStore = configureMockStore([thunk]);
  const initialState: SessionStateType = {
    authenticated: false,
    expiration: 0,
    isLoading: false,
    darkMode: DarkModes.CLEAR_MODE,
  } as SessionStateType;

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
  it('should call updateDarkMode', () => {
    // Arrange
    const action = DarkModes.DARK_MODE;
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: false,
      darkMode: DarkModes.DARK_MODE,
    };

    // Act
    const result = sessionReducer(initialState, updateDarkMode(action));

    // Assert
    expect(result).toEqual(expected);
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
    const claim = {
      authenticated: true,
      expiration: 1000,
      email: 'person@email.com',
      darkMode: 'dark-mode',
      context: '"context"',
    };
    const expectedSession = {
      output: {},
    };
    const response = {
      data: expectedSession,
    } as AxiosResponse;
    const store = mockStore();

    (callApi as jest.Mock).mockReturnValue(response);

    // Act
    await store.dispatch(saveSession(claim) as unknown as AnyAction);
    const actions = store.getActions();
    const newState = sessionReducer(store.getState() as SessionStateType, actions[0]);

    // Assert
    expect(actions[0].type).toEqual('session/saveSessionSuccess');
    expect(actions[0].payload).toEqual(expectedSession);
    expect(newState).toEqual({});
  });
  it('saveSession throw error',  async () => {
    // Arrange
    const claim = {
      authenticated: true,
      expiration: 1000,
      email: 'person@email.com',
      darkMode: 'dark-mode',
      context: '"context"',
    };
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();

    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await store.dispatch(saveSession(claim) as unknown as AnyAction);
    const actions = store.getActions();
    const newState = sessionReducer(store.getState() as SessionStateType, actions[0]);

    // Assert
    expect(actions[0].type).toEqual('session/saveSessionFailure');
    expect(actions[0].payload).toEqual(expected);
    expect(newState).toEqual( {});
  });
});

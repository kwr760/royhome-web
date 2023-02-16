import { AxiosResponse } from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { resumeReducer, fetchResume } from '../../../../src/features/resume/store/resume.slice';
import { callApi } from '../../../../src/util/api/call-api';
import { ResumeStateType } from '../../../../src/features/resume/contracts/resume.state';

jest.mock('../../../../src/util/api/call-api');

describe('store/resume/resume.slice', () => {
  const mockStore = configureMockStore([thunk]);

  it('should call fetchResume',  async () => {
    // Arrange
    const email = 'kroy760@gmail.com';
    const expectedResume = {
      output: {},
    };
    const expectedState = {
      email: 'unknown',
      resumes: {
        unknown: {},
      },
    };
    const response = {
      data: expectedResume,
    } as AxiosResponse;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockReturnValue(response);

    // Act
    await fetchResume(dispatch, email);
    const actions = store.getActions();
    const newState = resumeReducer(store.getState() as ResumeStateType, actions[2]);

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('session/clearLoading');
    expect(actions[2].type).toEqual('resume/getResumeSuccess');
    expect(actions[2].payload).toEqual(expectedResume);
    expect(newState).toEqual(expectedState);
  });
  it('should throw error',  async () => {
    // Arrange
    const email = 'kroy760@gmail.com';
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await fetchResume(dispatch, email);
    const actions = store.getActions();
    const newState = resumeReducer(store.getState() as ResumeStateType, actions[2]);

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('session/clearLoading');
    expect(actions[2].type).toEqual('resume/getResumeFailure');
    expect(actions[2].payload).toEqual(expected);
    expect(newState).toEqual( { error: expected });
  });
});

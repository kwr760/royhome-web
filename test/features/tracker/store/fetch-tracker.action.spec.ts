import type { AxiosResponse } from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Group } from '../../../../src/features/tracker/contracts/tracker.model';
import { TrackerStateType } from '../../../../src/features/tracker/contracts/tracker.state';
import { trackerReducer } from '../../../../src/features/tracker/store/tracker.slice';
import { fetchTracker } from '../../../../src/features/tracker/store/fetch-tracker.action';
import { callApi } from '../../../../src/util/api/call-api';

jest.mock('../../../../src/util/api/call-api');

describe('features/tracker/store/fetch-tracker.action', () => {
  const userId = 'user-id';
  const mockStore = configureMockStore([thunk]);

  it('should call fetchTracker',  async () => {
    // Arrange
    const expectedGroups: Array<Group> = [];
    const response = {
      data: expectedGroups,
    } as AxiosResponse;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockReturnValue(response);

    // Act
    await fetchTracker(dispatch, userId);
    const actions = store.getActions();
    trackerReducer(store.getState() as TrackerStateType, actions[2]);

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/getTrackerSuccess');
    expect(actions[1].payload).toEqual(expectedGroups);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
  it('should throw error',  async () => {
    // Arrange
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await fetchTracker(dispatch, userId);
    const actions = store.getActions();
    trackerReducer(store.getState() as TrackerStateType, actions[2]);

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/getTrackerFailure');
    expect(actions[1].payload).toEqual(expected);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
});

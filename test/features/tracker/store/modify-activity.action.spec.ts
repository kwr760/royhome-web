import type { AxiosResponse } from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Activity } from '../../../../src/features/tracker/contracts/tracker.model';
import { TrackerStateType } from '../../../../src/features/tracker/contracts/tracker.state';
import { trackerReducer } from '../../../../src/features/tracker/store/tracker.slice';
import { modifyActivityApi } from '../../../../src/features/tracker/store/modify-activity.action';
import { callApi } from '../../../../src/util/api/call-api';

jest.mock('../../../../src/util/api/call-api');

describe('features/tracker/store/modify-activity.action', () => {
  const mockStore = configureMockStore([thunk]);

  it('should modifyActivity',  async () => {
    // Arrange
    const newActivity = {
      group: {
        groupId: 'group-id',
      },
      activityId: 'activity-id',
      platform: 'New Platform',
      activity: 'New Activity',
      progress: 'New Progress',
    } as unknown as Activity;
    const expectedActivity = {
      groupId: 'group-id',
      platform: 'New Platform',
      activity: 'New Activity',
      progress: 'New Progress',
    };
    const response = {
      data: {
        ...expectedActivity,
      },
    } as AxiosResponse;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockReturnValue(response);

    // Act
    await modifyActivityApi(dispatch, newActivity);
    const actions = store.getActions();
    trackerReducer(store.getState() as TrackerStateType, actions[2]);

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/modifyActivity');
    expect(actions[1].payload).toEqual(expectedActivity);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
  it('should throw error',  async () => {
    // Arrange
    const newActivity = {
      group: {
        groupId: 'group-id',
      },
      activityId: 'activity-id',
      platform: 'Platform',
      activity: 'Activity',
      progress: 'Progress',
    } as unknown as Activity;
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await modifyActivityApi(dispatch, newActivity);
    const actions = store.getActions();
    trackerReducer(store.getState() as TrackerStateType, actions[2]);

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/storeFailure');
    expect(actions[1].payload).toEqual(expected);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
});

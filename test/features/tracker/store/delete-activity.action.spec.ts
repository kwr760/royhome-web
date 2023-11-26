import type { AxiosResponse } from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Activity } from '../../../../src/features/tracker/contracts/tracker.model';
import { deleteActivityApi } from '../../../../src/features/tracker/store/delete-activity.action';
import { callApi } from '../../../../src/util/api/call-api';

jest.mock('../../../../src/util/api/call-api');

describe('features/tracker/store/delete-activity.action', () => {
  const mockStore = configureMockStore([thunk]);

  it('should call deleteActivity',  async () => {
    // Arrange
    const newActivity = {
      group: {
        groupId: 'group-id',
      },
      activityId: 'activity-id',
    } as unknown as Activity;
    const expectedActivity = {
      groupId: 'group-id',
      activityId: 'activity-id',
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
    await deleteActivityApi(dispatch, newActivity);
    const actions = store.getActions();

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/removeActivity');
    expect(actions[1].payload).toEqual(expectedActivity);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
  it('should throw error',  async () => {
    // Arrange
    const deleteActivity = {
      group: {
        groupId: 'group-id',
      },
      activityId: 'delete-id',
    } as unknown as Activity;
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await deleteActivityApi(dispatch, deleteActivity);
    const actions = store.getActions();

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/storeFailure');
    expect(actions[1].payload).toEqual(expected);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
});

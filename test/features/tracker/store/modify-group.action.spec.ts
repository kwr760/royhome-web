import type { AxiosResponse } from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Group } from '../../../../src/features/tracker/contracts/tracker.model';
import { TrackerStateType } from '../../../../src/features/tracker/contracts/tracker.state';
import { trackerReducer } from '../../../../src/features/tracker/store/tracker.slice';
import { modifyGroupApi } from '../../../../src/features/tracker/store/modify-group.action';
import { callApi } from '../../../../src/util/api/call-api';

jest.mock('../../../../src/util/api/call-api');

describe('features/tracker/store/modify-group.action', () => {
  const mockStore = configureMockStore([thunk]);

  it('should call modifyGroup',  async () => {
    // Arrange
    const newGroup = {
      groupId: 'group-id',
      name: 'New Name',
    } as unknown as Group;
    const expectedGroup = {
      groupId: 'group-id',
      name: 'New Name',
    };
    const response = {
      data: {
        ...expectedGroup,
      },
    } as AxiosResponse;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockReturnValue(response);

    // Act
    await modifyGroupApi(dispatch, newGroup);
    const actions = store.getActions();
    trackerReducer(store.getState() as TrackerStateType, actions[2]);

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/modifyGroup');
    expect(actions[1].payload).toEqual(expectedGroup);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
  it('should throw error',  async () => {
    // Arrange
    const newGroup = {
      groupId: 'group-id',
      name: 'New Name',
    } as unknown as Group;
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await modifyGroupApi(dispatch, newGroup);
    const actions = store.getActions();
    trackerReducer(store.getState() as TrackerStateType, actions[2]);

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/storeFailure');
    expect(actions[1].payload).toEqual(expected);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
});

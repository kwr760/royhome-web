import type { AxiosResponse } from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { noId } from '../../../../src/contracts/constants/auth0.constants';
import { Group } from '../../../../src/features/tracker/contracts/tracker.model';
import { addGroupApi } from '../../../../src/features/tracker/store/add-group.action';
import { callApi } from '../../../../src/util/api/call-api';

jest.mock('../../../../src/util/api/call-api');

describe('features/tracker/store/add-group.action', () => {
  const mockStore = configureMockStore([thunk]);

  it('should call addGroup',  async () => {
    // Arrange
    const newGroup = {
      groupId: noId,
      name: 'Name',
    } as unknown as Group;
    const expectedGroup = {
      groupId: 'group-id',
      name: 'Name',
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
    await addGroupApi(dispatch, newGroup);
    const actions = store.getActions();

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/addGroup');
    expect(actions[1].payload).toEqual(expectedGroup);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
  it('should throw error',  async () => {
    // Arrange
    const newGroup = {
      groupId: noId,
      name: 'Name',
    } as unknown as Group;
    const errorMsg = 'Failure';
    const expected = 'Error: ' + errorMsg;
    const store = mockStore();
    const { dispatch } = store;

    (callApi as jest.Mock).mockImplementation(() => { throw Error(errorMsg); });

    // Act
    await addGroupApi(dispatch, newGroup);
    const actions = store.getActions();

    // Assert
    expect(actions[0].type).toEqual('session/setLoading');
    expect(actions[1].type).toEqual('tracker/storeFailure');
    expect(actions[1].payload).toEqual(expected);
    expect(actions[2].type).toEqual('session/clearLoading');
  });
});

import { type AnyAction } from 'redux';
import { trackerReducer, trackerSlice } from '../../../../src/features/tracker/store/tracker.slice';
import { TrackerStateType } from '../../../../src/features/tracker/contracts/tracker.state';

describe('features/tracker/store/tracker.slice', () => {
  const emptyState = {
    groups: [],
  } as unknown as TrackerStateType;
  const activity1 =  { activityId: '11', platform: 'c', activity: 'a', progress: '10' };
  const activity2 =  { activityId: '12', platform: 'a', activity: 'a', progress: '25' };
  const activity3 =  { activityId: '13', platform: 'a', activity: 'b', progress: '75' };
  const activityA =  { activityId: '21', platform: 'ab', activity: 'a', progress: '10' };
  const activityB =  { activityId: '22', platform: 'ac', activity: 'a', progress: '50' };
  let initialState = {
    groups: [
      { groupId: '1', name: 'One', activities: [ activity1, activity2, activity3 ] },
      { groupId: '2', name: 'Two', activities: [ activityA, activityB ] },
    ],
  } as unknown as TrackerStateType;

  beforeEach(() => {
    initialState = {
      groups: [
        { groupId: '1', name: 'One', activities: [ activity1, activity2, activity3 ] },
        { groupId: '2', name: 'Two', activities: [ activityA, activityB ] },
      ],
    } as unknown as TrackerStateType;
  });

  it('should call getTrackerSuccess',  async () => {
    // Arrange
    const { getTrackerSuccess } = trackerSlice.actions;
    const payload = {
      output: initialState.groups,
    } as unknown as AnyAction;
    const expectedState = {
      groups: initialState.groups,
    };

    // Act
    const newState = trackerReducer(emptyState, getTrackerSuccess(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
  it('should call getTrackerFailure',  async () => {
    // Arrange
    const { getTrackerFailure } = trackerSlice.actions;
    const payload = 'Error Message';
    const expectedState = {
      groups: [],
      error: payload,
    };

    // Act
    const newState = trackerReducer(emptyState, getTrackerFailure(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
  it('should call addGroup',  async () => {
    // Arrange
    const { addGroup } = trackerSlice.actions;
    const newGroup = {
      groupId: '3',
      name: 'One',
    };
    const payload = {
      output: newGroup,
    } as unknown as AnyAction;
    const expectedState = {
      groups: [
        { groupId: '1', name: 'One', activities: [ activity1, activity2, activity3 ] },
        { ...newGroup, activities: [] },
        { groupId: '2', name: 'Two', activities: [ activityA, activityB ] },
      ],
    };

    // Act
    const newState = trackerReducer(initialState, addGroup(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
  it('should call modifyGroup',  async () => {
    // Arrange
    const { modifyGroup } = trackerSlice.actions;
    const newGroup = {
      groupId: '1',
      name: 'a',
    };
    const payload = {
      ...newGroup,
    } as unknown as AnyAction;
    const expectedState = {
      groups: [
        { groupId: '1', name: 'a' },
        { groupId: '2', name: 'Two', activities: [ activityA, activityB ] },
      ],
    };

    // Act
    const newState = trackerReducer(initialState, modifyGroup(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
  it('should call removeGroup',  async () => {
    // Arrange
    const { removeGroup } = trackerSlice.actions;
    const payload = {
      groupId: '2',
    } as unknown as AnyAction;
    const expectedState = {
      groups: [
        { groupId: '1', name: 'One', activities: [ activity1, activity2, activity3 ] },
      ],
    };

    // Act
    const newState = trackerReducer(initialState, removeGroup(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
  it('should call addActivity',  async () => {
    // Arrange
    const { addActivity } = trackerSlice.actions;
    const newActivity = {
      activityId: '23',
      platform: 'ab',
      activity: 'a',
      progress: '15',
    };
    const payload = {
      groupId: '2',
      output: newActivity,
    } as unknown as AnyAction;
    const expectedState = {
      groups: [
        { groupId: '1', name: 'One', activities: [ activity1, activity2, activity3 ] },
        { groupId: '2', name: 'Two', activities: [ activityA, newActivity, activityB] },
      ],
    };

    // Act
    const newState = trackerReducer(initialState, addActivity(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
  it('should call modifyActivity',  async () => {
    // Arrange
    const { modifyActivity } = trackerSlice.actions;
    const newActivity = {
      activityId: '12',
      platform: 'a',
      activity: 'new',
      progress: '90',
    };
    const payload = {
      groupId: '1',
      output: newActivity,
    } as unknown as AnyAction;
    const expectedState = {
      groups: [
        { groupId: '1', name: 'One', activities: [ activity3, newActivity, activity1 ] },
        { groupId: '2', name: 'Two', activities: [ activityA, activityB ] },
      ],
    };

    // Act
    const newState = trackerReducer(initialState, modifyActivity(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
  it('should call removeActivity',  async () => {
    // Arrange
    const { removeActivity } = trackerSlice.actions;
    const payload = {
      groupId: '1',
      activityId: '12',
    } as unknown as AnyAction;
    const expectedState = {
      groups: [
        { groupId: '1', name: 'One', activities: [ activity1, activity3 ] },
        { groupId: '2', name: 'Two', activities: [ activityA, activityB ] },
      ],
    };

    // Act
    const newState = trackerReducer(initialState, removeActivity(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
  it('should call storeFailure',  async () => {
    // Arrange
    const { storeFailure } = trackerSlice.actions;
    const payload = 'Error Message';
    const expectedState = {
      groups: [],
      error: payload,
    };

    // Act
    const newState = trackerReducer(emptyState, storeFailure(payload));

    // Assert
    expect(newState).toEqual(expectedState);
  });
});

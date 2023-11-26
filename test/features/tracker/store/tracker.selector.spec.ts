import { useSelector } from 'react-redux';

import { getGroups, getGroupById, getActivityById } from '../../../../src/features/tracker/store/tracker.selector';

jest.mock('react-redux');

describe('features/tracker/store/tracker.selector', () => {
  const groups = [
    {
      groupId: 'group-id-one',
      name: 'One',
      activities: [
        { activityId: 'activity-id-one' },
        { activityId: 'activity-id-two' },
        { activityId: 'activity-id-three' },
      ],
    },
    {
      groupId: 'group-id-two',
      name: 'Two',
      activities: [
        { activityId: 'activity-id-a' },
        { activityId: 'activity-id-b' },
      ],
    },
  ];
  it('should return groups', () => {
    // Arrange
    const mockState = {
      tracker: {
        groups,
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const storeGroups = useSelector(getGroups);

    // Assert
    expect(storeGroups).toEqual(groups);
  });
  it('should return first group', () => {
    // Arrange
    const expectedGroup = {
      groupId: 'group-id-one',
      name: 'One',
      activities: [
        { activityId: 'activity-id-one' },
        { activityId: 'activity-id-two' },
        { activityId: 'activity-id-three' },
      ],
    };
    const mockState = {
      tracker: {
        groups,
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const group = useSelector(getGroupById('group-id-one'));

    // Assert
    expect(group).toEqual(expectedGroup);
  });
  it('should return activity a', () => {
    // Arrange
    const mockState = {
      tracker: {
        groups,
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const activity = useSelector(getActivityById('group-id-two', 'activity-id-a'));

    // Assert
    expect(activity).toEqual({ activityId: 'activity-id-a' });
  });
});

import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import Group from '../../../../src/features/tracker/components/group';
import { Activity } from '../../../../src/features/tracker/contracts/tracker.model';
import { themeLight } from '../../../../src/theme-light';

jest.mock('react-redux');
// jest.mock(
//   '../../../../src/features/tracker/components/group-modal',
//   () => jest.fn(() => <div>Group Modal</div>),
// );
// jest.mock(
//   '../../../../src/features/tracker/components/activity-modal',
//   () => jest.fn(() => <div>Activity Modal</div>),
// );
jest.mock(
  '../../../../src/features/tracker/components/activity',
  () => jest.fn(() => <div>Activity Component</div>),
);
describe('features/tracker/components/group', () => {
  it('should render', async () => {
    // Arrange
    const groupId = 'group-id';
    const groupName = 'Group Name';
    const activityId = 'activity-id ';
    const activities: Array<Activity> = [
      {
        activityId,
        platform: 'Platform',
        activity: 'Activity Name',
        progress: 'Progress',
      },
    ];
    const mockState = {
      session: {
        user: {
          userId: 'user-id',
        },
      },
      tracker: {
        groups: [{
          groupId,
          name: groupName,
          activities,
        }],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const { getByText, getAllByText, getAllByRole } = render(
      <ThemeProvider theme={themeLight}>
        <Group groupId={groupId} name={groupName} activities={activities}/>
      </ThemeProvider>,
    );

    // Assert
    getByText(/Activity Component/);
    getByText(/Add Activity/);
    fireEvent.click(getAllByRole('button')[1]);
    fireEvent.click(getByText('Add Activity'));
    fireEvent.click(getByText(/Close/));
    fireEvent.click(getAllByText(/Group Name/)[0]);
    fireEvent.click(getAllByText(/Close/)[1]);
  });
});

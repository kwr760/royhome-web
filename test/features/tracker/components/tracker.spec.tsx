import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import Tracker from '../../../../src/features/tracker/components/tracker';
import { themeLight } from '../../../../src/theme-light';

jest.mock('react-redux');
jest.mock('../../../../src/features/tracker/store/fetch-tracker.action');
jest.mock(
  '../../../../src/features/tracker/components/group',
  () => jest.fn(() => <div>Group Component</div>),
);
describe('features/tracker/components/tracker', () => {
  it('should render', () => {
    // Arrange
    const groupId = 'group-id';
    const activityId = 'activity-id ';
    const mockState = {
      session: {
        user: {
          userId: 'user-id',
        },
      },
      tracker: {
        groups: [{
          groupId,
          activities: [
            {
              activityId,
              platform: 'Platform',
              activity: 'Activity',
              progress: 'Progress',
            },
          ],
        }],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <Tracker />
      </ThemeProvider>,
    );

    // Assert
    getByText(/Watch List Tracker/);
    getByText(/Add Group/);
    getByText(/Group Component/);
  });
  it('should render empty groups', () => {
    // Arrange
    const mockState = {
      session: {
        user: {
          userId: 'user-id',
        },
      },
      tracker: {
        groups: [],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const { getByText, getByRole } = render(
      <ThemeProvider theme={themeLight}>
        <Tracker />
      </ThemeProvider>,
    );

    // Assert
    getByText(/Watch List Tracker/);
    getByText(/Add Group/);
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByText(/Close/));
  });
});

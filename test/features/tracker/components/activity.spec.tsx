import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import Activity from '../../../../src/features/tracker/components/activity';
import { themeLight } from '../../../../src/theme-light';

jest.mock('react-redux');

describe('features/tracker/components/activity', () => {
  it('should render', () => {
    // Arrange
    const groupId = 'group-id';
    const activityId = 'activity-id ';
    const mockState = {
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
    const { getByText, getByRole } = render(
      <ThemeProvider theme={themeLight}>
        <Activity groupId={groupId} activityId={activityId} />
      </ThemeProvider>,
    );

    // Assert
    getByText(/Platform/);
    getByText(/Activity/);
    getByText(/Progress/);
    getByText(/Edit/);
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByText(/Close/));
  });
});

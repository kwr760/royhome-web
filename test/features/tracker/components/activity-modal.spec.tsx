import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { act, fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import ActivityModal from '../../../../src/features/tracker/components/activity-modal';
import { addActivityApi } from '../../../../src/features/tracker/store/add-activity.action';
import { modifyActivityApi } from '../../../../src/features/tracker/store/modify-activity.action';
import { deleteActivityApi } from '../../../../src/features/tracker/store/delete-activity.action';
import { themeLight } from '../../../../src/theme-light';

jest.mock('react-redux');
jest.mock('../../../../src/features/tracker/store/add-activity.action');
jest.mock('../../../../src/features/tracker/store/modify-activity.action');
jest.mock('../../../../src/features/tracker/store/delete-activity.action');

describe('features/tracker/components/activity-modal', () => {
  it('should render for modify', async () => {
    // Arrange
    const onClose = jest.fn();
    const groupId = 'group-id';
    const name = 'Name';
    const activityId = 'activity-id ';
    const mockState = {
      tracker: {
        groups: [{
          groupId,
          name,
          activities: [
            {
              activityId,
              platform: 'Platform',
              activity: 'Activity Name',
              progress: 'Progress',
            },
          ],
        }],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const { getByText, getByDisplayValue } = render(
      <ThemeProvider theme={themeLight}>
        <ActivityModal open={true} groupId={groupId} activityId={activityId} onClose={onClose}/>
      </ThemeProvider>,
    );

    // Assert
    getByText(/Activity for/);
    fireEvent.blur(getByDisplayValue(/Platform/), {target: {value: 'New Platform'}});
    fireEvent.blur(getByDisplayValue(/Activity Name/), {target: {value: 'New Name'}});
    fireEvent.blur(getByDisplayValue(/Progress/), {target: {value: 'New Progress'}});
    getByText(/Delete/);
    await act(async () => {
      fireEvent.click(getByText(/Modify/));
    });
    expect(modifyActivityApi).toBeCalled();
    fireEvent.click(getByText(/Close/));
  });
  it('should render for delete', async () => {
    // Arrange
    const onClose = jest.fn();
    const groupId = 'group-id';
    const name = 'Name';
    const activityId = 'activity-id ';
    const mockState = {
      tracker: {
        groups: [{
          groupId,
          name,
          activities: [
            {
              activityId,
              platform: 'Platform',
              activity: 'Activity Name',
              progress: 'Progress',
            },
          ],
        }],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const { getByText, getAllByText, getByRole } = render(
      <ThemeProvider theme={themeLight}>
        <ActivityModal open={true} groupId={groupId} activityId={activityId} onClose={onClose}/>
      </ThemeProvider>,
    );

    // Assert
    getByText(/Activity for/);
    fireEvent.click(getByText(/Delete/));
    fireEvent.click(getAllByText(/Delete/)[0]);
    fireEvent.click(getAllByText(/Delete/)[0]);
    await act(async () => {
      fireEvent.click(getByRole('button', { name: 'Delete'}));
    });
    expect(deleteActivityApi).toBeCalled();
  });
  it('should render for add', async () => {
    // Arrange
    const onClose = jest.fn();
    const groupId = 'group-id';
    const name = 'Name';
    const activityId = 'activity-id ';
    const mockState = {
      tracker: {
        groups: [{
          groupId,
          name,
          activities: [
            {
              activityId,
              platform: 'Platform',
              activity: 'Activity Name',
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
        <ActivityModal open={true} groupId={groupId} onClose={onClose}/>
      </ThemeProvider>,
    );

    // Assert
    getByText(/Activity for/);
    fireEvent.blur(getByRole('textbox', { name: 'Platform' }), {target: {value: 'New Platform'}});
    fireEvent.blur(getByRole('textbox', { name: 'Activity' }), {target: {value: 'New Name'}});
    fireEvent.blur(getByRole('textbox', { name: 'Progress' }), {target: {value: 'New Progress'}});
    await act(async () => {
      fireEvent.click(getByText(/Add/));
    });
    expect(addActivityApi).toBeCalled();
  });
});

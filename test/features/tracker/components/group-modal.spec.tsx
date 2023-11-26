import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { act, fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import GroupModal from '../../../../src/features/tracker/components/group-modal';
import { addGroupApi } from '../../../../src/features/tracker/store/add-group.action';
import { modifyGroupApi } from '../../../../src/features/tracker/store/modify-group.action';
import { deleteGroupApi } from '../../../../src/features/tracker/store/delete-group.action';
import { themeLight } from '../../../../src/theme-light';

jest.mock('react-redux');
jest.mock('../../../../src/features/tracker/store/add-group.action');
jest.mock('../../../../src/features/tracker/store/modify-group.action');
jest.mock('../../../../src/features/tracker/store/delete-group.action');

describe('features/tracker/components/group-modal', () => {
  it('should render for modify', async () => {
    // Arrange
    const onClose = jest.fn();
    const groupId = 'group-id';
    const mockState = {
      session: {
        user: {
          userId: 'user-id',
        },
      },
      tracker: {
        groups: [{
          groupId,
          name: 'Group Name',
        }],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const { getByText, getByDisplayValue } = render(
      <ThemeProvider theme={themeLight}>
        <GroupModal open={true} groupId={groupId} onClose={onClose} />
      </ThemeProvider>,
    );

    // Assert
    getByText(/Group/);
    fireEvent.blur(getByDisplayValue(/Group Name/), {target: {value: 'New Group'}});
    getByText(/Delete/);
    await act(async () => {
      fireEvent.click(getByText(/Modify/));
    });
    expect(modifyGroupApi).toBeCalled();
    fireEvent.click(getByText(/Close/));
  });
  it('should render for delete', async () => {
    // Arrange
    const onClose = jest.fn();
    const groupId = 'group-id';
    const mockState = {
      session: {
        user: {
          userId: 'user-id',
        },
      },
      tracker: {
        groups: [{
          groupId,
          name: 'Group Name',
        }],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const { getByText, getByRole, getAllByText } = render(
      <ThemeProvider theme={themeLight}>
        <GroupModal open={true} groupId={groupId} onClose={onClose} />
      </ThemeProvider>,
    );

    // Assert
    getByText(/Group/);
    fireEvent.click(getByText(/Delete/));
    fireEvent.click(getAllByText(/Delete/)[0]);
    fireEvent.click(getAllByText(/Delete/)[0]);
    await act(async () => {
      fireEvent.click(getByRole('button', { name: 'Delete'}));
    });
    expect(deleteGroupApi).toBeCalled();
  });
  it('should render for add', async () => {
    // Arrange
    const onClose = jest.fn();
    const groupId = 'group-id';
    const mockState = {
      session: {
        user: {
          userId: 'user-id',
        },
      },
      tracker: {
        groups: [{
          groupId,
          name: 'Group Name',
        }],
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const { getByText, getByRole } = render(
      <ThemeProvider theme={themeLight}>
        <GroupModal open={true} onClose={onClose} />
      </ThemeProvider>,
    );

    // Assert
    getByText(/Group/);
    fireEvent.blur(getByRole('textbox', { name: 'Name' }), {target: {value: 'New Name'}});
    await act(async () => {
      fireEvent.click(getByText(/Add/));
    });
    expect(addGroupApi).toBeCalled();
  });
});

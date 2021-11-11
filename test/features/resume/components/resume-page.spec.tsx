import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import theme from '../../../../src/theme-light';
import { Auth0ContextType } from '../../../../src/type/auth0';
import { Auth0Context } from '../../../../src/util/auth0/auth0-context';
import { fetchResume } from '../../../../src/features/resume/store/resume.slice';
import ResumePage from '../../../../src/features/resume/components/resume-page';

jest.mock('react-redux');
jest.mock('../../../../src/features/resume/store/resume.slice');
jest.mock(
  '../../../../src/features/resume/components/resume-header',
  () => jest.fn(() => <div>Resume Header</div>),
);
jest.mock(
  '../../../../src/features/resume/components/resume-summary',
  () => jest.fn(() => <div>Resume Summary</div>),
);
jest.mock(
  '../../../../src/features/resume/components/resume-skills',
  () => jest.fn(() => <div>Resume Skills</div>),
);
jest.mock(
  '../../../../src/features/resume/components/resume-experience',
  () => jest.fn(() => <div>Resume Experience</div>),
);
jest.mock(
  '../../../../src/features/resume/components/resume-education',
  () => jest.fn(() => <div>Resume Education</div>),
);

describe('features/resume/component/resume-page', () => {
  const token = 'token';
  const email = 'kroy760@gmail.com';
  const dispatch = jest.fn();
  const defaultAuth = {
    getToken: jest.fn(() => token),
  } as unknown as Auth0ContextType;
  const getResume = (auth: Auth0ContextType) => (
    <ThemeProvider theme={theme}>
      <Auth0Context.Provider value={auth}>
        <ResumePage />
      </Auth0Context.Provider>
    </ThemeProvider>
  );

  it('should render request', async () => {
    // Arrange
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    // Act
    const { getByText } = render(getResume(defaultAuth));

    // Assert
    await waitFor(() => getByText(/Resume Header/));
    getByText(/Resume Summary/);
    getByText(/Resume Skills/);
    getByText(/Resume Experience/);
    getByText(/Resume Education/);
    expect(fetchResume).toBeCalledWith(email);
  });
  it('should not render resume when loading', async () => {
    // Arrange
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValueOnce({ owner: 'owner' }).mockReturnValueOnce(true);

    // Act
    const { queryByText } = render(getResume(defaultAuth));
    await waitFor(() => {});

    // Assert
    const missingHeader = queryByText(/Resume Header/);
    expect(missingHeader).toBeNull();
  });
});

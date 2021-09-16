import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Auth0ContextType } from '../../../../src/type/auth0';

import { Auth0Context } from '../../../../src/util/auth0/auth0-context';
import { fetchResume } from '../../../../src/feature/resume/store/resume.slice';
import Resume from '../../../../src/feature/resume/component';
import ResumeHeader from '../../../../src/feature/resume/component/header';
import ResumeSummary from '../../../../src/feature/resume/component/summary';
import ResumeSkills from '../../../../src/feature/resume/component/skills';
import ResumeExperience from '../../../../src/feature/resume/component/experience';
import ResumeEducation from '../../../../src/feature/resume/component/education';

jest.mock('react-redux');
jest.mock('../../../../src/feature/resume/store/resume.slice');
jest.mock('../../../../src/feature/resume/component/header');
jest.mock('../../../../src/feature/resume/component/summary');
jest.mock('../../../../src/feature/resume/component/skills');
jest.mock('../../../../src/feature/resume/component/experience');
jest.mock('../../../../src/feature/resume/component/education');

describe('component/private/resume', () => {
  const token = 'token';
  const email = 'kroy760@gmail.com';
  const dispatch = jest.fn();
  const defaultAuth = {
    getToken: jest.fn(() => token),
  } as unknown as Auth0ContextType;
  const getResume = (auth: Auth0ContextType) => (
    <Auth0Context.Provider value={auth}>
      <Resume />
    </Auth0Context.Provider>
  );

  beforeEach(() => {
    (ResumeHeader as jest.Mock).mockReturnValue('Resume Header');
    (ResumeSummary as jest.Mock).mockReturnValue('Resume Summary');
    (ResumeSkills as jest.Mock).mockReturnValue('Resume Skills');
    (ResumeExperience as jest.Mock).mockReturnValue('Resume Experience');
    (ResumeEducation as jest.Mock).mockReturnValue('Resume Education');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

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

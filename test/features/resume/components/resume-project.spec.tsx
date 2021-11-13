import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import { ProjectType } from '../../../../src/features/resume/types/object/resume';
import ResumeProject from '../../../../src/features/resume/components/resume-project';
import theme from '../../../../src/theme-light';

describe('features/resume/components/resume-project', () => {
  it('should render', () => {
    // Arrange
    const project = [{
      name: 'project #1',
      url: 'url1',
      description: 'description',
      startDate: '2020-01-01',
      endDate: '',
    },{
      name: 'project #2',
      url: 'url2',
      description: 'description',
      startDate: '2020-02-01',
      endDate: '2021-03-01',
    }];

    // Act
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResumeProject project={project} />
      </ThemeProvider>,
    );

    // Assert
    getByText(/Projects/);
    getByText(/url1/);
    getByText(/January 2020/);
    getByText(/current/);
    getByText(/project #2/);
    getByText(/February 2020/);
    getByText(/March 2021/);
  });
  it('should render without props', () => {
    // Arrange / Act
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ResumeProject project={[] as ProjectType[]}/>
      </ThemeProvider>,
    );

    // Assert
    getByText('Projects');
  });
});
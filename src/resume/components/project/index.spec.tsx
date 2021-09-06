import React from 'react';
import { render } from '@testing-library/react';
import { ProjectType } from '../../../types/object/resume';

import ResumeProject from './index';

describe('client/components/resume/project', () => {
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
      <ResumeProject project={project} />,
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
      <ResumeProject project={[] as ProjectType[]}/>,
    );

    // Assert
    getByText('Projects');
  });
});

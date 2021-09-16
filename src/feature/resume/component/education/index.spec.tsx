import React from 'react';
import { render } from '@testing-library/react';
import { EducationType } from '../../type/object/resume';

import ResumeEducation from './index';

describe('feature/resume/componenteducation', () => {
  it('should render', () => {
    // Arrange
    const education = [{
      degree: 'degree',
      school: 'school',
      graduation: '2020-01-01',
    }];

    // Act
    const { getByText } = render(
      <ResumeEducation education={education} />,
    );

    // Assert
    getByText('degree,');
    getByText('school');
    getByText('January 2020');
  });
  it('should render without props', () => {
    // Arrange / Act
    const { getByText } = render(
      <ResumeEducation education={[] as EducationType[]}/>,
    );

    // Assert
    getByText('Education');
  });
});

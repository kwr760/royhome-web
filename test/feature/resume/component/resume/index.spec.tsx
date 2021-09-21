import React from 'react';
import { render } from '@testing-library/react';
import { ResumeType } from '../../../../../src/feature/resume/type/object/resume';

import Resume from '../../../../../src/feature/resume/component/resume';

describe('feature/resume/componentresume', () => {
  it('should render', () => {
    // Arrange
    const resume = {
      phone: 'phone',
      email: 'email',
      displayPhone: false,
      address: 'address',
      name: 'name',
    } as ResumeType;

    // Act
    const { getByText } = render(
      <Resume resume={resume} />,
    );

    // Assert
    getByText('address');
    getByText('email');
    getByText('name');
    getByText(/Summary/);
    getByText(/Skills/);
    getByText('Professional Experience');
    getByText('Education');
  });
  it('should render with empty object', () => {
    // Arrange
    const resume = {} as ResumeType;

    // Act
    const { getByText } = render(
      <Resume resume={resume}/>,
    );

    // Assert
    getByText('Cell upon request');
    getByText(/Summary/);
    getByText('Skills');
    getByText('Professional Experience');
    getByText('Education');
  });
});
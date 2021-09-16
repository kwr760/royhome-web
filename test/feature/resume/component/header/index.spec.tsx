import React from 'react';
import { render } from '@testing-library/react';

import ResumeHeader from '../../../../../src/feature/resume/component/header';

describe('feature/resume/componentheader', () => {
  it('should render with phone', () => {
    // Arrange
    const name = 'name';
    const phone = 'phone';
    const email = 'email';
    const displayPhone = true;
    const address = 'address';

    // Act
    const { getByText } = render(
      <ResumeHeader name={name} address={address} phone={phone} email={email} displayPhone={displayPhone}/>,
    );

    // Assert
    getByText('address');
    getByText('name');
    getByText('email');
    getByText('phone');
  });
  it('should render without props', () => {
    // Arrange

    // Act
    const { getByText } = render(
      <ResumeHeader name={''} address={''} phone={''} email={''} displayPhone={false}/>,
    );

    // Assert
    getByText('Cell upon request');
  });
});

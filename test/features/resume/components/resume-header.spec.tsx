import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

import ResumeHeader from '../../../../src/features/resume/components/resume-header';
import { themeLight } from '../../../../src/theme-light';

describe('features/resume/components/resume-header', () => {
  it('should render with phone', () => {
    // Arrange
    const name = 'name';
    const phone = 'phone';
    const email = 'email';
    const displayPhone = true;
    const address = 'address';

    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <ResumeHeader name={name} address={address} phone={phone} email={email} displayPhone={displayPhone}/>
      </ThemeProvider>,
    );

    // Assert
    getByText('address');
    getByText('name');
    getByText('email');
    getByText('phone');
  });
  it('should render without props', () => {
    // Arrange // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <ResumeHeader name={''} address={''} phone={''} email={''} displayPhone={false}/>
      </ThemeProvider>,
    );

    // Assert
    getByText('Cell upon request');
  });
});

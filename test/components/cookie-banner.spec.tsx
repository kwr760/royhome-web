import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';

import { themeLight } from '../../src/theme-light';
import CookieBanner from '../../src/components/cookie-banner';
import { setCookie } from '../../src/util/cookies';

jest.mock('../../src/util/cookies');

describe('components/cookie-banner', () => {
  it('renders', () => {
    // Arrange/Act
    const test = render(
      <ThemeProvider theme={themeLight}>
        <CookieBanner />
      </ThemeProvider>,
    );

    // Assert
    test.getByText(/I use cookies on my website/);
    test.getByText(/Proceed/);
  });
  it('closes on click', async() => {
    // Arrange
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <CookieBanner />
      </ThemeProvider>,
    );

    // Act
    const button = getByText(/Proceed/);
    fireEvent.click(button);

    // Assert
    expect(setCookie).toBeCalledWith('acknowledge-cookie-use', 'true');
  });
});

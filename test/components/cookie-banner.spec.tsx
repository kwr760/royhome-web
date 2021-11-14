import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render } from '@testing-library/react';

import themeLight from '../../src/theme-light';
import CookieBanner from '../../src/components/cookie-banner';

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
  it('closes on click', () => {
    // Arrange
    const test = render(
      <ThemeProvider theme={themeLight}>
        <CookieBanner />
      </ThemeProvider>,
    );

    // Act
    fireEvent.click(test.getByText(/Proceed/));

    // Assert
    const result = test.queryAllByText(/I use cookies on my website/);
    expect(result.length).toBe(0);
  });
});

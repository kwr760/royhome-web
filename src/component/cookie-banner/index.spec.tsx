import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import themeLight from '../../theme-light';

import CookieBanner from './index';

describe('component/page/cookie-banner', () => {
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

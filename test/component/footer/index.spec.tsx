import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import themeLight from '../../../src/theme-light';

import Footer from '../../../src/component/footer';

describe('component/page/footer', () => {
  it('renders', () => {
    // Arrange/Act
    const test = render(
      <ThemeProvider theme={themeLight}>
        <Footer />
      </ThemeProvider>,
    );

    // Assert
    test.getByLabelText(/github/);
    test.getByText(/Link to GitHub/);
  });
  it('render as open', () => {
    // Arrange
    const test = render(
      <ThemeProvider theme={themeLight}>
        <Footer />
      </ThemeProvider>,
    );

    // Act
    fireEvent.mouseEnter(test.getByLabelText(/github/));

    // Assert
    test.getByText(/Link to UI GitHub/);
    test.getByText(/Link to API GitHub/);

    fireEvent.click(test.getByLabelText(/github-ui/));
  });
});

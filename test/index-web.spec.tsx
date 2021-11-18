/* eslint-disable global-require */
import React from 'react';
import reactDOM, { render, unmountComponentAtNode } from 'react-dom';
import { Auth0Provider } from '../src/util/auth0/auth0-spa';

const mockApp = jest.fn(() => <div>App</div>);

jest.mock('@loadable/component');
jest.mock('../src/util/auth0/auth0-spa');
jest.mock('../src/App', () => mockApp);

describe('src/client/index-web', () => {
  let mainContainer: HTMLElement;
  beforeEach(() => {
    // setup a DOM element as a render target
    mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'main');
    document.body.appendChild(mainContainer);
  });
  afterEach(() => {
    jest.clearAllMocks();
    // cleanup on exiting
    unmountComponentAtNode(mainContainer);
    mainContainer.remove();
  });

  it('launches the App with targetUrl', () => {
    // Arrange
    (Auth0Provider as jest.Mock).mockImplementation(({ children }) => <div>Auth0Provider: { children }</div>);
    jest.spyOn(reactDOM, 'hydrate').mockImplementation(
      (element, container) => render(element, container),
    );

    // Act
    require('../src/index-web');

    // Assert
    expect(Auth0Provider).toBeCalled();
    expect(mockApp).toBeCalled();
  });
  it('launches the App with empty root', () => {
    jest.isolateModules(() => {
      // Arrange
      jest.spyOn(document, 'getElementById').mockImplementation(() => null);

      // Act // Assert
      require('../src/index-web');
    });
  });
});

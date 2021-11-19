import React from 'react';
import { render } from '@testing-library/react';
import { Auth0ContextData } from '../../../src/contracts/auth0.models';
import { Auth0Provider } from '../../../src/util/auth0/auth0-node';
import { useAuth0 } from '../../../src/util/auth0/auth0-context';

describe('util/auth0/react-auth0-node', () => {
  const TestConsumer = () => {
    const {
      logout,
      login,
      getToken,
    } = useAuth0();

    return (
      <div>
        { `login: ${login({})}` }
        { `getToken: ${getToken({})}` }
        { `logout: ${logout()}` }
      </div>
    );
  };
  it('should populate a Provider', () => {
    // Arrange
    const context = {
      login: () => {},
      logout: () => {},
      getToken: () => {},
    } as Auth0ContextData;
    const provider = (
      <Auth0Provider context={context} domain='domain' client_id='client_id'>
        <TestConsumer />
      </Auth0Provider>
    );

    // Act
    const { getByText } = render(provider);

    // Assert
    getByText(/logout: undefined/);
    getByText(/login: undefined/);
    getByText(/getToken: undefined/);
  });
});

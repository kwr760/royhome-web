import React from 'react';
import { render } from '@testing-library/react';
import { Auth0ContextData } from '../../../src/contracts/auth0.models';
import { AuthProvider } from '../../../src/util/auth0/auth0-node';
import { useAuth } from '../../../src/util/auth0/auth0-context';

describe('util/auth0/react-auth0-node', () => {
  const TestConsumer = () => {
    const {
      logout,
      login,
      getToken,
    } = useAuth();

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
      <AuthProvider context={context} domain='domain' clientId='clientId'>
        <TestConsumer />
      </AuthProvider>
    );

    // Act
    const { getByText } = render(provider);

    // Assert
    getByText(/logout: undefined/);
    getByText(/login: undefined/);
    getByText(/getToken: undefined/);
  });
});

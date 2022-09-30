import React from 'react';
import { render } from '@testing-library/react';
import { Auth0Context } from '../../../src/contracts/auth0.models';
import { noop } from '../../../src/util/noop';

import { AuthContext, useAuth } from '../../../src/util/auth0/auth0-context';

const Test = () => {
  const { login } = useAuth();
  return (
    <div>
      { `TestValue: ${login}` }
    </div>
  );
};

describe('util/auth0/context', () => {
  const getTest = (auth: Auth0Context) => (
    <AuthContext.Provider value={auth}>
      <Test />
    </AuthContext.Provider>
  );

  it('should produce a context', () => {
    // Arrange
    const auth: Auth0Context = {
      login: () => 'login',
      logout: noop,
      getToken: noop,
    };
    // Act
    const { getByText } = render(getTest(auth));

    // Assert
    getByText(/TestValue:/);
    getByText(/login/);
  });
});

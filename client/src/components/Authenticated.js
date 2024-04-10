import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { useIsAuthenticated, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { Scene } from '.';

import { loginRequest } from '../config/auth';

import './Authenticated.css';

export const Authenticated = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const { error } = useMsalAuthentication(InteractionType.Redirect, {
    ...loginRequest,
    redirectUri: '/',
  });

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Container className="Authenticated">
      <Scene>
        {error ? (
          <>
            <h2>Uh oh!</h2>
            <p>
              We were unable to authenticate you. Try refreshing your browser?
            </p>
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{JSON.stringify(error, null, 2)}</p>
            </Alert>
          </>
        ) : (
          <Container className="Authenticated-Authorizing">
            <p>One sec while we handle authentication...</p>
          </Container>
        )}
      </Scene>
    </Container>
  );
};

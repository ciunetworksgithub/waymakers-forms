import Container from 'react-bootstrap/Container';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useState } from 'react';

import { Scene } from '../';

import { Authenticator, Error, Interstitial, Loader } from './components';
import './index.css';

export const Authenticated = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();
  const [error, setError] = useState(false);
  const [showAuthenticator, setShowAuthenticator] = useState(false);
  console.log(`[JMG] inProgress`, inProgress);

  const handleError = error => {
    setError(error);
  };

  const handleLogin = () => {
    setShowAuthenticator(true);
  };

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Container className="Authenticated">
      <Scene>
        {error ? (
          <Error error={error} />
        ) : inProgress === 'handleRedirect' ? (
          <Loader />
        ) : showAuthenticator ? (
          <Authenticator onError={handleError} />
        ) : (
          <Interstitial onLogin={handleLogin} />
        )}
      </Scene>
    </Container>
  );
};

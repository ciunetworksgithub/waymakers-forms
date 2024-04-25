import { useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

import { loginRequest } from '../../../config/auth';
import { Loader } from '.';

export const Authenticator = ({ onError = () => true }) => {
  const { error } = useMsalAuthentication(InteractionType.Redirect, {
    ...loginRequest,
    redirectUri: '/',
  });

  if (error) {
    onError(error);
    return null;
  }

  return <Loader />;
};

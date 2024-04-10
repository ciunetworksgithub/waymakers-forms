import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import {
  getContactsByEmail,
  getFieldsConfig,
  getFormsConfig,
  transformContactsFields,
  transformFormsConfig,
} from '../helpers';

export const useFormDefs = () => {
  const { accounts } = useMsal();
  const [config, setConfig] = useState();
  const [error, setError] = useState();
  const account = accounts?.[0];

  useEffect(() => {
    if (!account) {
      return;
    }

    (async () => {
      try {
        const [contacts, fields, forms] = await Promise.all([
          getContactsByEmail(account.username),
          getFieldsConfig(),
          getFormsConfig(),
        ]);
        setConfig(
          transformContactsFields({
            contacts,
            config: transformFormsConfig({ fieldDefaults: fields, forms }),
          })
        );
      } catch (e) {
        setError(e);
      }
    })();
  }, [account]);

  return {
    config,
    error,
  };
};

import { useEffect, useState } from 'react';
import { getFieldsConfig, getFormsConfig } from '../helpers';
import { transformFormsConfig } from '../helpers/transform-forms-config';

export const useFormDefs = () => {
  const [config, setConfig] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const [fields, forms] = await Promise.all([
          getFieldsConfig(),
          getFormsConfig(),
        ]);
        setConfig(transformFormsConfig({ fieldDefaults: fields, forms }));
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  return {
    config,
    error,
  };
};

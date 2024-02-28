import { useEffect, useState } from 'react';

export const useDependentField = ({
  listensTo,
  onOptionsLoaded,
  values,
  options: _options,
  optionsApi,
}) => {
  const [parentState, setParentState] = useState(values[listensTo]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(_options);

  useEffect(() => {
    if (!listensTo || parentState === values[listensTo]) return;
    setIsLoading(true);
    optionsApi(values[listensTo]).then(newOptions => {
      setParentState(values[listensTo]);
      setOptions(newOptions);
      setIsLoading(false);
      onOptionsLoaded?.();
    });
  }, [onOptionsLoaded, listensTo, optionsApi, parentState, values]);

  return {
    isEmpty: Object.keys(options).length === 0,
    isLoading,
    options,
  };
};

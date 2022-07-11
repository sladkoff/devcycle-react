import React, { FC, useMemo, useState } from 'react';
import { DVCOptions, DVCUser, initialize } from '@devcycle/devcycle-js-sdk';
import { DevcycleContext } from './DevcycleContext';

type ProviderConfig = {
  envKey: string;
  user?: DVCUser;
  options?: DVCOptions;
};

type Props = {
  config: ProviderConfig;
  children?: React.ReactNode;
};

export const DevcycleProvider: FC<Props> = ({ config, children }) => {
  const { envKey, user, options } = config;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const client = useMemo(() => {
    try {
      setIsLoading(true);
      return initialize(
        envKey,
        user ?? {
          isAnonymous: true,
        },
        options
      );
    } catch (e) {
      setIsError(true);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [envKey, user, options]);

  return (
    <DevcycleContext.Provider
      value={{
        client,
        isLoading,
        isError,
      }}
    >
      {children}
    </DevcycleContext.Provider>
  );
};

import {
  DevCycleOptionsWithDeferredInitialization,
  initializeDevCycle,
} from '@devcycle/devcycle-js-sdk';
import React, { FC, useMemo, useState } from 'react';
import { DevcycleContext } from './DevcycleContext';

type ProviderConfig = {
  envKey: string;
  options?: DevCycleOptionsWithDeferredInitialization;
};

type Props = {
  config: ProviderConfig;
  children?: React.ReactNode;
};

export const DevcycleProvider: FC<Props> = ({ config, children }) => {
  const { envKey, options } = config;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const client = useMemo(() => {
    try {
      setIsLoading(true);
      return initializeDevCycle(
        envKey,
        options ?? {
          deferInitialization: true,
        }
      );
    } catch (e) {
      setIsError(true);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, [envKey, options]);

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

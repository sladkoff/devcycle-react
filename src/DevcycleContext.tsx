import { DVCClient } from '@devcycle/devcycle-js-sdk';
import React from 'react';

export type DevcycleContextType = {
  client: DVCClient | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const DevcycleContext = React.createContext<DevcycleContextType>({
  client: undefined,
  isLoading: true,
  isError: false,
});

import { useContext } from 'react';
import { DevcycleContext, DevcycleContextType } from './DevcycleContext';

export function useDevcycle(): DevcycleContextType {
  return useContext(DevcycleContext);
}

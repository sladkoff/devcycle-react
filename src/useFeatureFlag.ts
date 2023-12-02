import { useDevcycle } from './useDevcycle';
import { DVCVariable, DVCVariableValue } from '@devcycle/devcycle-js-sdk';
import { FeatureFlag } from './FeatureFlag';
import { useEffect, useState } from 'react';

export function useFeatureFlag<T extends DVCVariableValue>(
  key: string,
  defaultValue: T
): FeatureFlag<T> {
  const [value, setValue] = useState<DVCVariableValue>(defaultValue);
  const { client, isError, isLoading } = useDevcycle();

  useEffect(() => {
    if (
      client !== undefined &&
      key !== undefined &&
      defaultValue !== undefined
    ) {
      const devcycleValue = client?.variable(key, defaultValue)?.value;
      setValue(devcycleValue ?? defaultValue);
    }
  }, [client, key, defaultValue]);

  useEffect(() => {
    if (client === undefined) {
      return;
    }

    client.subscribe(
      `variableUpdated:${key}`,
      (_key: string, variable: DVCVariable<DVCVariableValue> | null) => {
        setValue(variable?.value ?? defaultValue);
      }
    );

    return () => {
      if (client === undefined) {
        return;
      }
      client.unsubscribe(`variableUpdated:${key}`);
    };
  }, [client, key, defaultValue]);

  return {
    key: key,
    value: value as T,
    isLoading: isLoading,
    isError: isError,
  };
}

import React, { FC, Fragment } from 'react';
import { DVCVariableValue } from '@devcycle/devcycle-js-sdk';
import { useFeatureFlag } from './useFeatureFlag';

type Props = {
  id: string;
  defaultValue: DVCVariableValue;
  enabledOnValue: DVCVariableValue;
  children?: React.ReactNode;
};

export const Feature: FC<Props> = ({
  id,
  defaultValue,
  enabledOnValue,
  children,
}) => {
  const { value } = useFeatureFlag(id, defaultValue);

  if (value === enabledOnValue) {
    return <Fragment>{children}</Fragment>;
  }

  return <Fragment />;
};

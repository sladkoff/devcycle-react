export type FeatureFlag<T> = {
  key: string;
  value: T;
  isLoading: boolean;
  isError: boolean;
};

// Lightweight mock-api scaffolding.
// Feature mocks (offers, reviews, chat) live in sibling files and are surfaced
// through the hooks under `src/hooks/`. This file keeps small shared helpers
// used by those hooks so they all return the same react-query-like shape.

export interface MockQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}

export const mockQueryOk = <T>(data: T): MockQueryResult<T> => ({
  data,
  isLoading: false,
  isError: false,
  isFetching: false,
});

export const mockQueryMissing = <T>(): MockQueryResult<T> => ({
  data: undefined,
  isLoading: false,
  isError: true,
  isFetching: false,
});

export interface MockMutationCallbacks {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export interface MockMutationResult<TArgs> {
  mutate: (args: TArgs, callbacks?: MockMutationCallbacks) => void;
  isPending: boolean;
}

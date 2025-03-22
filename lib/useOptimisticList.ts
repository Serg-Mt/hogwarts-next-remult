import { useState, useOptimistic, useCallback, startTransition, SetStateAction } from 'react';

type ValOrPromiseVal<T> = Promise<T> | T;

export function useOptimisticList<E, T extends ReadonlyArray<E>>(initialList: T, /* reducer */) {
  const
    [_list, directSet] = useState<T>(initialList),
    [list, updateFn] = useOptimistic<T, T>(
      _list,
      (_, next) => next),
    update = useCallback((
      optimistic: T,
      getSetStateAction: () => ValOrPromiseVal<SetStateAction<T>>,
      onError?: (error: Error) => void
    ) => {
      try {
        startTransition(async () => {
          updateFn(optimistic);
          directSet(await getSetStateAction());
        });
      } catch (error) {
        onError?.(error as Error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [/* updateFn */]);

  return { list, update, directSet };
}

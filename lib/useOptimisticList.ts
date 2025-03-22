import { useState, useOptimistic, useCallback, startTransition, SetStateAction } from 'react';

type ValOrPromiseVal<T> = Promise<T> | T;

export function useOptimisticList<St extends ReadonlyArray<E>, E>(initialList: St) {
  const
    [_list, directSet] = useState<St>(initialList),
    [list, updateFn] = useOptimistic(
      _list,
      (state: St, action: SetStateAction<St>) =>
        'function' === typeof action
          ? action(state)
          : action
    ),
    update = useCallback((
      optimistic: SetStateAction<St>,
      getSetStateAction: () => ValOrPromiseVal<SetStateAction<St>>,
      onError?: (error: Error) => void
    ) => {
      try {
        startTransition(async () => {
          updateFn(optimistic);
          directSet(await getSetStateAction());
          console.log('useOptimisticList','ok');
        });
      } catch (error) {
        onError?.(error as Error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return { list, update, directSet };
}

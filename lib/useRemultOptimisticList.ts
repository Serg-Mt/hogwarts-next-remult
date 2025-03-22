import { useEffect, useState, useCallback, useRef } from 'react';
import { repo, ClassType, FindOptions } from 'remult';
import type { idType } from '@/node_modules/remult/src/remult3/remult3'; // в аду уже есть котел, но мы еще посмотрим для меня или для разрабов remult 
import { useOptimisticList } from './useOptimisticList';

import { ImmutableList } from './immutable';
import type { HasId, IdType } from './hadId';

export const optimisticCSS = {
  added: 'optimistic added',
  updated: 'optimistic updated',
  deleted: 'optimistic deleted'
}

// клонатор местного значения
const clone = globalThis.structuredClone ?? (obj => ({ ...obj }));


// классы для оптимистичности будем хранить в структуре Map
type State = undefined | keyof typeof optimisticCSS;
type RefType = Map<IdType, State>;

// type idType<T> = Parameters<Repository<T>['delete']>[0]



export function useRemultOptimisticList<ItemClass extends HasId, RepositoryType extends ClassType<ItemClass>>(entity: RepositoryType, { findOption }: { findOption?: FindOptions<ItemClass> } = {}) {
  const
    { list, update, directSet } = useOptimisticList(new ImmutableList<ItemClass>),
    [error, setError] = useState<Error | null>(null),
    [loading, setLoading] = useState(true),
    listClone = useRef(list), // тут будем хранить текущий список
    _ref = useRef(new Map as RefType), //вместо стейта используем рефы

    // эта функция отдаст интерфейсу оптимистичный класс элемента по его id
    // теоретически одновременно несколько элементов могут ожидать апдейта с сервера
    getOptimisticClassById = useCallback((id: IdType) => {
      if (_ref.current.has(id))
        return optimisticCSS[_ref.current.get(id)!];
      return '';
    }, []),

    deleteElementById = useCallback((id: idType<ItemClass>) => {
      _ref.current.set(id, 'deleted');
      // console.debug('deleteElementById', { id }, { _ref });
      const
        item = clone(listClone.current.getById(id)); // чтоб Pure-компонент обновился
      update(
        listClone.current.replaceById(id, item!),
        async () => {
          await repo(entity).delete(id);
          _ref.current.delete(id);
          return prev => prev.deleteById(id);
        });
    }, [entity]),

    addElement = useCallback((item: ItemClass) => {
      const
        cloneItem = clone(item);
      if (!cloneItem.id)
        cloneItem.id = Math.random();
      _ref.current.set(cloneItem.id, 'added');
      // console.debug('addElement', { fakeItem: cloneItem });
      update(
        listClone.current.add(cloneItem),
        async () => {
          const
            newItem = await repo(entity).insert(item);
          _ref.current.delete(cloneItem.id);
          return prev => prev.add(newItem);
        });
    }, [entity]),

    updateElement = useCallback((item: ItemClass) => {
      _ref.current.set(item.id, 'updated');
      // console.debug('updateElement', { item })
      update(
        listClone.current.replaceById(item.id, item),
        async () => {
          await repo(entity).update(item.id as idType<ItemClass>, item);
          _ref.current.delete(item.id);
          return prev => prev.replaceById(item.id, item);
        });
    }, [entity]);

  listClone.current = list;


  useEffect(() => {
    repo(entity).find(
      findOption
    ).then(result => directSet(new ImmutableList(...result)))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [entity]);

  return {
    list,
    getOptimisticClassById,
    error,
    loading,
    deleteElementById,
    addElement,
    updateElement
  };
}


// function obj<T = any>(value: T, options?: StructuredSerializeOptions | undefined): T {
//   throw new Error('Function not implemented.');
// }


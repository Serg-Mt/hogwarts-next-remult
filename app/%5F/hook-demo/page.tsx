'use client';

import { ImmutableList } from '@/lib/immutable';
// import { ImmutableList } from '@/lib/immutable';
import { useOptimisticList } from '@/lib/useOptimisticList';
import { useRemultOptimisticList } from '@/lib/useRemultOptimisticList';
import { Item } from '@/shared/entities/Item';
import { useCallback, useEffect, useRef } from 'react';
import type { ChangeEvent, ChangeEventHandler, ReactNode } from 'react';

async function wait(ms: number) {
  const
    { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, ms);
  return promise;
}


type ListItem = Item;
type ItemId = ListItem['id'];

type RefType = { id: ItemId, state: 'added' | 'deleted' | 'edited' };

export default function Page() {
  return <>
    <DemoHookUseOptimisticList />
    <DemoHookUseRemultOptimisticList />
  </>
}

function DemoHookUseOptimisticList() {  // один TODO просто в памяти
  console.debug('DemoHookUseOptimisticList')
  const
    { list, update } = useOptimisticList<unknown, Item[]>([]),
    _ref = useRef({} as RefType),

    add = useCallback((item: Item) => {
      _ref.current = { id: item.id, state: 'added' };
      const newList = [...list, item];
      update(newList, async () => {
        await wait(1000);
        _ref.current = {} as RefType;
        return old => [...old, item];
      });
    }, [list]),
    del = useCallback(async (id: ItemId) => {
      _ref.current = { id, state: 'deleted' };
      const newList = list.filter(x => String(x.id) !== String(id));
      console.log('del1', { id }, _ref.current);
      update([...list], async () => {
        await wait(1000);
        _ref.current = {} as RefType;
        return newList
      });
    }, [list]),
    edit = useCallback(async (item: Item) => {
      _ref.current = { id: item.id, state: 'edited' };
      const newList = list.map(x => String(x.id) === String(item.id) ? { ...item } : x);
      update([...list], async () => {
        await wait(1000);
        _ref.current = {} as RefType;
        return newList
      });
    }, [list]),
    getClassById = useCallback((id: ItemId) => {
      if (String(_ref.current.id) === String(id))
        return 'optimistic';
      return '';
    }, [list]);

  return <>
    <GenericToDo
      list={list}
      add={add}
      del={del}
      edit={edit}
      getClassById={getClassById}
    >в памяти (useOptimisticList)</GenericToDo>
  </>
}

function DemoHookUseRemultOptimisticList() {
  console.debug('DemoHookUseRemultOptimisticList');
  const
    { list,
      loading,
      addElement,
      deleteElementById,
      updateElement,
      getOptimisticClassById }
      = useRemultOptimisticList(Item); // второй на сервере
  return <GenericToDo
    list={list}
    loading={loading}
    add={addElement}
    del={deleteElementById}
    edit={updateElement}
    getClassById={getOptimisticClassById}
  >
    на сервере (useOptimisticServerList)
  </GenericToDo>;
}

type GenericToDoPropsType = {
  list: Item[] | ImmutableList<Item>,
  loading?: boolean,
  add: (_: ListItem) => void,
  del: (_: ItemId) => void,
  edit: (_: ListItem) => void,
  children: ReactNode,
  getClassById: (_: ItemId) => string
}

function GenericToDo(
  { list, loading, add, del, edit, children, getClassById }: GenericToDoPropsType
) {
  useEffect(() => console.debug('GenericToDo change list',), [list]);
  useEffect(() => console.debug('GenericToDo change loading',), [loading]);
  useEffect(() => console.debug('GenericToDo change add',), [add]);
  useEffect(() => console.debug('GenericToDo change del',), [del]);
  useEffect(() => console.debug('GenericToDo change edit',), [edit]);
  useEffect(() => console.debug('GenericToDo change children',), [children]);
  useEffect(() => console.debug('GenericToDo change getClassById',), [getClassById]);
  const
    formRef = useRef<HTMLFormElement>(null),
    formAdd = useCallback(async (formData: FormData) => {
      const
        title = formData.get('title') as string,
        item = new Item();
      Object.assign(item, { title, id: Math.random().toString() });
      // console.log('formAdd', { title, item });
      add(item);
      formRef.current?.reset();
    }, [add]),

    formDel = useCallback(async (formData: FormData) => {
      const
        id = formData.get('id') as string;
      console.debug('formDel', { id }, ...formData.entries());
      del(+id);
    }, [del]),
    // formEdit = useCallback(async (formData: FormData) => {
    //   const
    //     id = formData.get('id') as string,
    //     title = formData.get('title') as string;
    //   await edit(id, { title });
    // }, [edit]),
    onChange = useCallback(async (evt: ChangeEvent<HTMLInputElement>) => {
      const
        id = evt.currentTarget.dataset?.id,
        completed = (evt.currentTarget).checked,
        newItem = Object.assign({}, list.find(x => String(x.id) === String(id)), { completed });
      // console.debug('onChange', { id, completed, newItem });
      edit(newItem);
    }, [edit, list]);

  console.debug('GenericToDo');
  return <fieldset className="border p-2">
    <legend>{children}</legend>
    <form action={formAdd} ref={formRef}>
      <input name="title" />
      <button type="submit">+</button>
    </form>
    {loading ? <Spinner /> :
      <ul>
        {list.map(item =>
          <ItemComponent
            key={item.id}
            item={item}
            formDel={formDel}
            onChange={onChange}
            className={getClassById(item.id)}
          />
        )}
      </ul>}
  </fieldset>
}


type FormAction = (formData: FormData) => Promise<void>;

function ItemComponent({ item, formDel, onChange, className }
  : { item: Item, formDel: FormAction, onChange: ChangeEventHandler, className: string }) {
  const { id, title, completed, /* createdAt */ } = item;
  return <li className={className}>
    <input type="checkbox" checked={completed} onChange={onChange} data-id={id} />
    {title}
    <form action={formDel} className="inline">
      <input type="hidden" name="id" value={id} />
      <button type="submit">✖</button>
      ({id})
      {completed ? '✅' : ''}
    </form>
  </li>
}


function Spinner() {
  return <div>loading...</div>
}
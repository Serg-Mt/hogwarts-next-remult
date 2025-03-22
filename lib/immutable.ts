import { HasId, IdType } from './hadId';

export class ImmutableList<T extends HasId> extends Array<T> {
  // static [Symbol.species] = ImmutableList; 
  // readonly this!: ImmutableList<T>;

  static isEqualCallback(id: IdType) {
    return (obj: HasId) => String(obj.id) === String(id);
  }
  static isNotEqualCallback(id: IdType) {
    return (obj: HasId) => String(obj.id) !== String(id);
  }

  public add(obj: T) {
    return new ImmutableList(...this, obj);
  }

  public getIndexById(id: IdType) {
    return this.findIndex(ImmutableList.isEqualCallback(id));
  }

  public getById(id: IdType) {
    return this.find(ImmutableList.isEqualCallback(id)) ?? null;
  }

  public deleteById(id: IdType) {
    return this.filter(ImmutableList.isNotEqualCallback(id)) as ImmutableList<T>;
  }

  public replaceById(id: IdType, obj: T) {
    let
      wasNotFound = true;
    const
      testFn = ImmutableList.isEqualCallback(id),
      found = () => { wasNotFound = false; return obj },
      result = this.map(elem => testFn(elem) ? found() : elem);
    if (wasNotFound) throw new Error('ImmutableList: not found id');
    return result as ImmutableList<T>;
  }
}

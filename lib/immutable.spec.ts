
import { HasId } from './hadId';
import { ImmutableList } from './immutable'; // Adjust the import path as needed
import { describe, beforeEach, test, expect } from "bun:test";

interface TestItem extends HasId {
  name: string;
}

describe('ImmutableList', () => {
  const
    testData: TestItem[] = [
      { id: 1, name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: 3, name: 'Item 3' }];

  let list: ImmutableList<TestItem>;

  beforeEach(() => {
    list = new ImmutableList(...testData);
  });

  describe('getIndexById', () => {
    test('should return correct index for numerical id', () => {
      expect(list.getIndexById(1)).toBe(0);
    });

    test('should return correct index for string id', () => {
      expect(list.getIndexById('2')).toBe(1);
    });

    test('should return -1 if id not found', () => {
      expect(list.getIndexById(99)).toBe(-1);
      expect(list.getIndexById('non-existent-id')).toBe(-1);
    });

    test('should handle id type mismatches correctly', () => {
      expect(list.getIndexById('1')).toBe(0);
      expect(list.getIndexById(2)).toBe(1);
    });
  });

  describe('deleteById', () => {
    test('should delete item by numerical id', () => {
      const newList = list.deleteById(1);
      expect(newList.length).toBe(2);
      expect(newList.find(item => item.id === 1)).toBeUndefined();
    });

    test('should delete item by string id', () => {
      const newList = list.deleteById('2');
      expect(newList.length).toBe(2);
      expect(newList.find(item => item.id === '2')).toBeUndefined();
    });

    test('should not alter list if id not found', () => {
      const newList = list.deleteById(99);
      expect(newList.length).toBe(3);
    });

    test('should handle id type mismatches correctly', () => {
      const newList = list.deleteById('1');
      expect(newList.find(item => item.id === 1)).toBeUndefined();
    });
  });

  describe('replaceById', () => {
    test('should replace item by numerical id', () => {
      const newItem = { id: 1, name: 'New Item 1' };
      const newList = list.replaceById(1, newItem);
      expect(newList[0]).toEqual(newItem);
    });

    test('should replace item by string id', () => {
      const newItem = { id: '2', name: 'New Item 2' };
      const newList = list.replaceById('2', newItem);
      expect(newList[1]).toEqual(newItem);
    });

    test('should throw an error if id not found', () => {
      const newItem = { id: 99, name: 'Non-Existent Item' };
      expect(() => list.replaceById(99, newItem)).toThrow('not found id');
    });

    test('should handle id type mismatches correctly', () => {
      const newItem = { id: 1, name: 'New Item 1' };
      const newList = list.replaceById('1', newItem);
      expect(newList[0]).toEqual(newItem);
    });
  });
});

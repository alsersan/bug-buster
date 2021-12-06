import { getChangedItems } from '../get-changed-items';

describe('Given the compareArrays function', () => {
  describe('when items have been added to the second array', () => {
    test('then it should return the added items', () => {
      const { removed, added } = getChangedItems([1, 2, 3], [1, 2, 3, 4, 5]);
      expect(removed).toEqual([]);
      expect(added).toEqual([4, 5]);
    });
    test('then it should return the added items', () => {
      const { removed, added } = getChangedItems([1, 2, 3], [1, 4, 2, 8, 3]);
      expect(removed).toEqual([]);
      expect(added).toEqual([4, 8]);
    });
  });

  describe('when items have been removed from the second array', () => {
    test('then it should return the removed items', () => {
      const { removed, added } = getChangedItems([1, 2, 3, 4, 5], [4, 2]);
      expect(removed).toEqual([1, 3, 5]);
      expect(added).toEqual([]);
    });
    test('then it should return the removed items', () => {
      const { removed, added } = getChangedItems([1, 2, 3, 4, 5], [3]);
      expect(removed).toEqual([1, 2, 4, 5]);
      expect(added).toEqual([]);
    });
  });

  describe('when items have been added and removed from the second array', () => {
    test('then it should return the removed and added items', () => {
      const { removed, added } = getChangedItems([1, 2, 3, 4, 5], [5, 8, 3]);
      expect(removed).toEqual([1, 2, 4]);
      expect(added).toEqual([8]);
    });
    test('then it should return the removed and added items', () => {
      const { removed, added } = getChangedItems([1, 2, 3, 4, 5], [9, 7, 1, 6]);
      expect(removed).toEqual([2, 3, 4, 5]);
      expect(added).toEqual([9, 7, 6]);
    });
  });
});

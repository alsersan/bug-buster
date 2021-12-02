// Compares two arrays of ids and returns the ids that have been added and deleted in the new array
export function changedItems(previousArr, newArr) {
  // Both ids are transformed to strings to assure that none of them is an ObjectId
  const isSameValue = (a, b) => a.toString() === b.toString();
  const compareArrays = (arr1, arr2, compareFunction) =>
    arr1.filter(
      (arr1Value) =>
        !arr2.some((arr2Value) => compareFunction(arr1Value, arr2Value)),
    );
  const removed = compareArrays(previousArr, newArr, isSameValue);
  const added = compareArrays(newArr, previousArr, isSameValue);
  return { removed, added };
}

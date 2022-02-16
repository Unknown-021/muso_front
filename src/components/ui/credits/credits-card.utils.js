import { objectSize } from 'helpers/object';
import { assert } from 'helpers/utils';

export function limitArrayByObjectProperty(arr, objectProp, limit) {
  const filteredArr = [];
  let counter = 0;

  if (arr.length === 0) {
    return filteredArr;
  }

  for (let i = 0; i < arr.length && counter < limit; ++i) {
    const item = arr[i];
    filteredArr.push(item);
    counter += item[objectProp].length;
  }

  const excessCount = counter - limit;

  if (excessCount > 0) {
    const lastItem = filteredArr.pop();
    filteredArr.push({
      ...lastItem,
      [objectProp]: lastItem[objectProp].slice(0, -excessCount)
    });
  }

  return filteredArr;
}

export function isAssociationArraysEqual(arr1, arr2) {
  assert(Array.isArray(arr1), `Expected argument to be an array, but received "${typeof arr1}"`);
  assert(Array.isArray(arr2), `Expected argument to be an array, but received "${typeof arr2}"`);

  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((item, index) => {
    return item.collaborators.length === arr2[index].collaborators.length;
  });
}

export function countCollaborators(associations) {
  assert(Array.isArray(associations), `Expected argument to be an array, but received "${typeof associations}"`);
  const artistsMap = {};

  for (let i = 0; i < associations.length; ++i) {
    const collaborators = associations[i].collaborators;
    for (let j = 0; j < collaborators.length; ++j) {
      artistsMap[collaborators[j].profile.id] = true;
    }
  }

  return objectSize(artistsMap);
}

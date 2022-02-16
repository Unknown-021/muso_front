export function arrayFlat(arr) {
  return [].concat(...arr);
}

export function lastElement(arr) {
  return arr[arr.length - 1];
}

export function createArray(length, map) {
  const arr = [];
  for (let i = 0; i < length; ++i) {
    arr.push(map(i));
  }
  return arr;
}

export function getNextArrayElement(arr, el) {
  const indexOf = arr.indexOf(el);
  const nextElIndex = (indexOf + 1) % arr.length;
  return arr[nextElIndex];
}

export function removeArrayElement(arr, el) {
  const indexOf = arr.indexOf(el);
  if (indexOf !== -1) {
    return arr.splice(indexOf, 1)[0];
  }
  return undefined;
}

export function removeArrayElementById(arr, id) {
  const indexOf = arr.findIndex(item => item.id === id);
  if (indexOf !== -1) {
    return arr.splice(indexOf, 1)[0];
  }
  return undefined;
}

export function pick(arr, maxCount) {
  const step = Math.ceil(arr.length / maxCount);
  const newArr = [];
  for (let i = 0; i < arr.length && newArr.length < maxCount; i += step) {
    newArr.push(arr[i]);
  }
  return newArr;
}

export function shiftIndex(direction, index, length) {
  if (direction === 'forward') {
    return (index + 1) % length;
  } else if (direction === 'backward') {
    const normalizedIndex = index <= 0
      ? length
      : index;
    return normalizedIndex - 1;
  }
};

export function getUniqueItems(target, source) {
  const targetIds = target.map(item => item.id);
  const targetSet = new Set(targetIds);
  return source.filter(item => !targetSet.has(item.id));
}

export function unionByIds(...arrays) {
  const map = new Map();

  arrays.forEach(array => {
    array.forEach(item => {
      const curItem = map.get(item.id);
      map.set(item.id, {
        ...curItem,
        ...item
      });
    });
  });

  return [...map.values()];
}

export function accumulateObjects(prop) {
  return (accumulator, currValue) => accumulator + currValue[prop];
}

export function isObjectEqualSimple(objA, objB) {
  if (objectSize(objA) !== objectSize(objB)) {
    return false;
  }

  for (const key in objA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

export function objectSize(obj) {
  let size = 0;
  for (const key in obj) ++size;
  return size;
}

export function filterObject(obj, filter) {
  const res = {};
  for (const key in obj) {
    const value = obj[key];
    if (filter(value)) {
      res[key] = value;
    }
  }
  return res;
}

export function objectMap(obj, map) {
  const newObj = {};
  
  for (let key in obj) {
    newObj[key] = map(obj[key], key);
  }

  return newObj;
}

export function lastItem(array) {
  return array[array.length - 1];
}

const identity = (value) => value;

export function createIdsMap(...args) {
  if (typeof lastItem(args) !== 'function') {
    args.push(identity);
  }
  const getItem = args.pop();
  const map = {};
  
  args.forEach(array => {
    array.forEach(item => {
      const target = getItem(item);
      map[target.id] = target;
    });
  });

  return map;
}

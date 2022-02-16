export function createTextSorter(property) {
  return (a, b) => {
    if (a[property] === b[property]) return 0;

    if (a[property] > b[property]) {
      return 1;
    } else {
      return -1;
    }
  };
}

export function createNumbersSorter(property) {
  return (a, b) => a[property] - b[property];
}

export function invertSorter(sorter) {
  return (a, b) => sorter(b, a);
}

export function createNestedArraySorter(arrProperty, property) {
  return (a, b) => {
    const arrA = a[arrProperty];
    const arrB = b[arrProperty];

    for (let i = 0; i < arrA.length; ++i) {
      const itemA = arrA[i];
      const itemB = arrB[i];

      if (itemB === undefined) {
        return 1;
      }

      if (itemA[property] > itemB[property]) {
        return 1;
      } else if (itemA[property] < itemB[property]) {
        return -1;
      }
    }

    return arrA.length === arrB.length
      ? 0
      : -1;
  }
}

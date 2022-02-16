import Vue from 'vue';
import { isServer } from './constants';

export function assert(condition, message) {
  if (process.env.NODE_EVN === 'production') return;

  if (!condition) {
    throw new Error(message);
  }
}

export function debounce(handler, duration) {
  if (!duration) {
    return handler;
  }
  let timerId = null;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(handler, duration, ...args);
  };
}

export function throttle(handler, duration) {
  if (!duration) {
    return handler;
  }
  let timerId = null;

  return (...args) => {
    if (!timerId) {
      timerId = setTimeout(() => {
        timerId = null;
        handler.apply(null, args);
      }, duration);
    }
  };
}

export function identity(value) {
  return value;
}

export function noop() {}

export function handlersTimeoutControl({ handler, timeout, onTimeoutChange }) {
  let firedTimersCount = 0;
  const isServer = (typeof window === 'undefined');
  
  return async (...args) => {
    if (isServer) {
      return handler(...args);
    }

    let isTimerFired = false;
    let timerId = window.setTimeout(() => {
      isTimerFired = true;
      onTimeoutChange(++firedTimersCount);
    }, timeout);
  
    try {
      await handler(...args);
    } finally {
      window.clearTimeout(timerId);
      if (isTimerFired) {
        onTimeoutChange(--firedTimersCount);
      }
    }
  };
}

export function newDestructedPromise() {
  let resolve = null;
  let reject = null;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

export function mutationsProxy(target, getChanges) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      const changes = getChanges();
      const obj = prop in changes ? changes : target;
      return Reflect.get(obj, prop, receiver);
    },
    set(target, prop, val) {
      const changes = getChanges();
      Vue.set(changes, prop, val);
      return true;
    }
  });
}

export function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// The purpose of this util is to improve UX for cases
// when data comes not from a server, but from a cache.
// We dont't want to change variable value which denots loading if
// data comes from a cache.
export async function loading(handler, setLoading) {
  let timerId = null;
  try {
    if (isServer) {
      setLoading(true);      
    } else {
      timerId = window.setTimeout(() => {
        setLoading(true);
      });
    }
    const result = await handler();
    return result;
  } finally {
    if (!isServer) {
      window.clearTimeout(timerId);
    }
    setLoading(false);
  }
}

// We change skeletonCount value in order to make nice transitions
// between table with different count of rows.
// For example imagine that our table has 5 rows to display.
// We filter out table data by some criteria and only 3 rows left.
// If rowSkeletonCount prop set to 20, then we will have following
// situation: first we show 5 rows, then when filtering is happening 20 rows (skeletons)
// and then 3 rows. It means that during filtering count of table rows will change 2 times.
// We want to reduce this number to 1. This is how it will like now: 5 rows => 5 rows (skeletons) => 3 rows.
export function updateSkeletonCount(newData, oldData, currCount) {
  return Math.min(newData.length, oldData.length, currCount) || currCount;
}

import { AsyncLocalStorage } from 'node:async_hooks';

const context = {};
const contextStorage = new AsyncLocalStorage();

export function setGlobalContext(newContext: object) {
  Object.assign(context, newContext);
}

export function withContext<T extends object, R>(
  fn: () => R,
  extraContext?: T,
): R {
  return contextStorage.run({ ...context, ...(extraContext || {}) }, fn);
}

export function getContext<T extends object>(): T {
  return contextStorage.getStore() as T;
}

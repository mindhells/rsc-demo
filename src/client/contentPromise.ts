import type { ReactNode } from 'react';
import { createFromFetch } from 'react-server-dom-webpack/client';

let contentPromise: unknown;

export function updateContentPromise(fetchPromise, callServer) {
  contentPromise = createFromFetch(fetchPromise, { callServer });
  return contentPromise as PromiseLike<{ root: ReactNode; returnValue }>;
}

export function getContentPromise() {
  return contentPromise as PromiseLike<{ root: ReactNode }>;
}

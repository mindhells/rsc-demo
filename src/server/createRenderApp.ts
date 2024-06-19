import { PassThrough } from 'node:stream';
import { createElement as h } from 'react';
import { renderToPipeableStream } from 'react-server-dom-webpack/server';
import App from '../components/App.js';
import { withContext } from './withContext.js';

export function createRenderApp(REACT_CLIENT_MANIFEST_MAP) {
  return function renderApp(returnValue = undefined) {
    return withContext(() => {
      const root = h(App);
      const { pipe } = renderToPipeableStream(
        { root, returnValue },
        REACT_CLIENT_MANIFEST_MAP,
      );
      return pipe(new PassThrough());
    });
  };
}

import { encodeReply } from 'react-server-dom-webpack/client';

import { updateContent } from './contentUpdater.js';
import { updateContentPromise } from './contentPromise.js';

function onStreamFinished(fetchPromise, onFinished) {
  // create a promise chain that resolves when the stream is completely consumed
  return (
    fetchPromise
      // clone the response so createFromFetch can use it (otherwise we lock the reader)
      // and wait for the text to be consumed so we know the stream is finished
      .then((response) => response.clone().text())
      .then(onFinished)
  );
}

export async function callServer(id, args) {
  const fetchPromise = fetch('/action', {
    method: 'POST',
    headers: { 'rsc-action': id },
    body: await encodeReply(args),
  });
  onStreamFinished(fetchPromise, () => {
    updateContent();
  });
  // update the content after the action
  const contentPromise = updateContentPromise(fetchPromise, callServer);
  const { returnValue } = await contentPromise;
  return returnValue;
}

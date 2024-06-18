import {
  Suspense,
  startTransition,
  use,
  type ReactNode,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { createRoot } from 'react-dom/client';
import { createFromFetch, encodeReply } from 'react-server-dom-webpack/client';

function generateKey() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

let updateContentKey = (key) => {
  console.error('updateContentKey called before it was set!', key);
};

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

let contentPromise = createFromFetch(fetch('/rsc'), { callServer });

async function callServer(id, args) {
  const fetchPromise = fetch('/action', {
    method: 'POST',
    headers: { 'rsc-action': id },
    body: await encodeReply(args),
  });
  const contentKey = generateKey();
  onStreamFinished(fetchPromise, () => {
    updateContentKey(contentKey);
  });
  contentPromise = createFromFetch(fetchPromise, { callServer });
  const { returnValue } = await contentPromise;
  return returnValue;
}

function Root() {
  const [, setContentKey] = useState(null);
  const [, startTransition] = useTransition();
  useEffect(() => {
    updateContentKey = (key) => startTransition(() => setContentKey(key));
  }, []);
  const content = use<{ root: ReactNode }>(contentPromise).root;
  return content;
}

startTransition(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;
  const root = createRoot(rootElement);
  root.render(
    <Suspense fallback="loading">
      <Root />
    </Suspense>,
  );
});

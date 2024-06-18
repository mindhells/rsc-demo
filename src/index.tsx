import { Suspense, startTransition, use, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { createFromFetch, encodeReply } from 'react-server-dom-webpack/client';

async function callServer(id, args) {
  const fetchPromise = fetch('/action', {
    method: 'POST',
    headers: { 'rsc-action': id },
    body: await encodeReply(args),
  });
  const actionResponsePromise = createFromFetch(fetchPromise);
  const { returnValue } = await actionResponsePromise;
  return returnValue;
}

const contentPromise = createFromFetch(fetch('/rsc'), { callServer });

function Root() {
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

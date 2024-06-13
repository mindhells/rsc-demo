import { Suspense, startTransition, use, type ReactNode } from 'react';
import { createFromFetch } from 'react-server-dom-webpack/client';
import { createRoot } from 'react-dom/client';

const contentPromise = createFromFetch(fetch('/rsc'));

function Root() {
  const content = use(contentPromise);
  return content as ReactNode;
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

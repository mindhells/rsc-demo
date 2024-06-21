import { Suspense, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import Root from './Root.js';
import { updateContentPromise } from './contentPromise.js';
import { callServer } from './callServer.js';
import Fallback from './Fallback.js';

// initial content load
function initialize() {
  updateContentPromise(fetch('/rsc'), callServer);
}
initialize();

let recoveryAttempts = 0;

function fallbackRender({ error, resetErrorBoundary }) {
  recoveryAttempts++;
  const maxAttemptsReached = recoveryAttempts > 3;
  !maxAttemptsReached &&
    setTimeout(() => {
      try {
        initialize();
        resetErrorBoundary();
      } catch (e) {
        console.error('Error happened during recovery:', e);
      }
    }, recoveryAttempts * 3000);
  const message = maxAttemptsReached
    ? 'We are experiencing a temporary issue, please try again later'
    : 'An error happened, trying to restart...';
  return <Fallback message={message} />;
}

startTransition(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;
  const root = createRoot(rootElement);
  root.render(
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Suspense fallback={<Fallback message="Connecting to Cliptonic…" />}>
        <Root />
      </Suspense>
      ,
    </ErrorBoundary>,
  );
});

import { Suspense, startTransition } from 'react';
import { createRoot } from 'react-dom/client';

import Root from './Root.js';
import { updateContentPromise } from './contentPromise.js';
import { callServer } from './callServer.js';
import { Home } from '../components/home/Home.js';
import ChatFallback from '../components/chat/ChatFallback.js';

// initial content load
updateContentPromise(fetch('/rsc'), callServer);

startTransition(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;
  const root = createRoot(rootElement);
  root.render(
    <Suspense
      fallback={
        <Home>
          <ChatFallback />
        </Home>
      }
    >
      <Root />
    </Suspense>,
  );
});

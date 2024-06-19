import { use, type ReactNode, useEffect, useState, useTransition } from 'react';

import { setContentUpdater } from './contentUpdater.js';
import { getContentPromise } from './contentPromise.js';

function Root() {
  const [, setContentKey] = useState<string>('');
  const [, startTransition] = useTransition();
  useEffect(() => {
    // allow external content update to trigger re-render
    setContentUpdater((key) => startTransition(() => setContentKey(key)));
  }, []);
  const contentPromise = getContentPromise();
  const content = use<{ root: ReactNode }>(contentPromise).root;
  return content;
}

export default Root;

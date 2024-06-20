import type { PropsWithChildren } from 'react';

import styles from './Home.scss';

const COMPONENT_NAME = 'home';

export function Home({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className={styles[COMPONENT_NAME]}>
      <h1 className={styles[`${COMPONENT_NAME}__heading`]}>How can I help?</h1>
      {children}
    </main>
  );
}

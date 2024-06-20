import type { PropsWithChildren } from 'react';

import styles from './Home.scss';

export function Home({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className={styles['home--scaffold']}>
      <h2 className={styles['home--heading']}>How can I help?</h2>
      {children}
    </main>
  );
}

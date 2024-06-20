import type { ReactNode } from 'react';

import styles from './Avatar.scss';

export function Avatar({ icon }: Readonly<{ icon: ReactNode }>) {
  return (
    <div className={styles.avatar}>
      <div className={styles['avatar--image']}>{icon}</div>
    </div>
  );
}

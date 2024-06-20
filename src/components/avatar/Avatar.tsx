import type { ReactNode } from 'react';

import styles from './Avatar.scss';

const COMPONENT_NAME = 'avatar';

export function Avatar({ icon }: Readonly<{ icon: ReactNode }>) {
  return (
    <div className={styles[COMPONENT_NAME]}>
      <div className={styles[`${COMPONENT_NAME}__image`]}>{icon}</div>
    </div>
  );
}

import type { ReactNode } from 'react';

import styles from './IconButton.scss';

const COMPONENT_NAME = 'icon-button';

export function IconButton({ icon, ...rest }: Readonly<{ icon: ReactNode }>) {
  return (
    <button
      className={styles[COMPONENT_NAME]}
      type="button"
      {...rest}
    >
      <div className={styles[`${COMPONENT_NAME}__icon`]}>{icon}</div>
    </button>
  );
}

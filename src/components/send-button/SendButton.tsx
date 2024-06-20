import { SendIcon } from '../icons/SendIcon.js';

import styles from './SendButton.scss';

const COMPONENT_NAME = 'send-button';

export function SendButton({ disabled }: Readonly<{ disabled?: boolean }>) {
  return (
    <button
      className={styles[COMPONENT_NAME]}
      type="submit"
      aria-label="Send"
      disabled={disabled}
    >
      <div className={styles[`${COMPONENT_NAME}__icon`]}>
        <SendIcon />
      </div>
    </button>
  );
}

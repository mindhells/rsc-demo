import { SendIcon } from '../icons/SendIcon.js';

import styles from './SendButton.scss';

export function SendButton({ disabled }: Readonly<{ disabled?: boolean }>) {
  return (
    <button
      type="submit"
      className={styles['send-button']}
      aria-label="Send"
      disabled={disabled}
    >
      <div className={styles['send-button--icon']}>
        <SendIcon />
      </div>
    </button>
  );
}

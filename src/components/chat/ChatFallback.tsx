import Spinner from '../spinner/Spinner.js';

import styles from './Chat.scss';

const COMPONENT_NAME = 'chat';

function ChatFallback({ message }: Readonly<{ message: string }>) {
  return (
    <div className={styles[COMPONENT_NAME]}>
      <div className={styles[`${COMPONENT_NAME}__fallback`]}>
        <Spinner size='large' />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default ChatFallback;

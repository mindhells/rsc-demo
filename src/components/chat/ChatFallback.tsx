import Spinner from '../spinner/Spinner.js';

import styles from './Chat.scss';

const COMPONENT_NAME = 'chat';

function ChatFallback() {
  return (
    <div className={styles[COMPONENT_NAME]}>
      <div className={styles[`${COMPONENT_NAME}__fallback`]}>
        <Spinner size='large' />
        <p>Connecting with Cliptonic…</p>
      </div>
    </div>
  );
}

export default ChatFallback;

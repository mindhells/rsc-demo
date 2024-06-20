import styles from './Chat.scss';

const COMPONENT_NAME = 'chat';

function ChatFallback() {
  return (
    <div className={styles[COMPONENT_NAME]}>
      <div className={styles[`${COMPONENT_NAME}__overlay`]}>
        <span>Connecting with Cliptonic©</span>
        <span>Spinner here</span>
      </div>
    </div>
  );
}

export default ChatFallback;

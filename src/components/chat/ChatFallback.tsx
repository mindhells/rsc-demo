import styles from './Chat.scss';

const COMPONENT_NAME = 'chat';

function ChatFallback({ message }: Readonly<{ message: string }>) {
  return (
    <div className={styles[COMPONENT_NAME]}>
      <div className={styles[`${COMPONENT_NAME}__overlay`]}>
        <span>{message}</span>
        <span>Spinner here</span>
      </div>
    </div>
  );
}

export default ChatFallback;

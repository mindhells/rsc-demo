import type { Message } from '../../model/Message.js';
import { buildClassName } from '../../utils/buildClassName.js';

import styles from './MessageBubble.scss';

export function MessageBubble({ message }: Readonly<{ message: Message }>) {
  return (
    <div
      className={buildClassName(
        styles['message-bubble'],
        styles[`message-bubble__${message.sender}`],
      )}
    >
      <p>{message.text}</p>
    </div>
  );
}

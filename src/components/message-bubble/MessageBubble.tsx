import type { Message } from '../../model/Message.js';
import { buildClassName } from '../../utils/buildClassName.js';

import styles from './MessageBubble.scss';

const COMPONENT_NAME = 'message-bubble';

export function MessageBubble({ message }: Readonly<{ message: Message }>) {
  return (
    <div
      className={buildClassName(
        styles[COMPONENT_NAME],
        styles[`${COMPONENT_NAME}--${message.sender}`],
      )}
    >
      <p>{message.text}</p>
    </div>
  );
}

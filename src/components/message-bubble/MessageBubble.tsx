import type { MessagePayload } from '../../model/Message.js';
import { buildClassName } from '../../utils/buildClassName.js';
import Spinner from '../spinner/Spinner.js';

import styles from './MessageBubble.scss';

const COMPONENT_NAME = 'message-bubble';

export function MessageBubble({
  message,
}: Readonly<{ message: MessagePayload }>) {
  return (
    <div
      className={buildClassName(
        styles[COMPONENT_NAME],
        styles[`${COMPONENT_NAME}--${message.sender}`],
      )}
    >
      {message.pending && message.sender === 'assistant' ? (
        <>
          <Spinner variant='light' />
          Thinking…
        </>
      ) : (
        <p>{message.text}</p>
      )}
    </div>
  );
}

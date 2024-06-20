import type { MessagePayload } from '../../model/Message.js';
import { buildClassName } from '../../utils/buildClassName.js';
import { Avatar } from '../avatar/Avatar.js';
import { CliptonicLogo } from '../icons/CliptonicLogo.js';
import { MessageBubble } from '../message-bubble/MessageBubble.js';

import styles from './MessageEntry.scss';

const COMPONENT_NAME = 'message-entry';

export function MessageEntry({
  message,
  isPending,
}: Readonly<{ message: MessagePayload; isPending?: boolean }>) {
  return (
    <li
      key={`${message.timestamp ?? 'new'}${message.sender}`}
      className={buildClassName(
        styles[COMPONENT_NAME],
        styles[`${COMPONENT_NAME}--${message.sender}`],
        isPending && styles[`${COMPONENT_NAME}--pending`],
      )}
    >
      <div className={styles[`${COMPONENT_NAME}__avatar`]}>
        {message.sender === 'assistant' && <Avatar icon={<CliptonicLogo />} />}
      </div>
      <div className={styles[`${COMPONENT_NAME}__bubble`]}>
        <MessageBubble message={message} />
        <p className={styles[`${COMPONENT_NAME}__time`]}>
          <time dateTime={message.timestamp?.toISOString()}>
            {message.timestamp?.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            }) ?? 'just now'}
          </time>
        </p>
      </div>
    </li>
  );
}

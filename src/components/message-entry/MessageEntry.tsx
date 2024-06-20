import type { Message } from '../../model/Message.js';
import { buildClassName } from '../../utils/buildClassName.js';
import { Avatar } from '../avatar/Avatar.js';
import { CliptonicLogo } from '../icons/CliptonicLogo.js';
import { MessageBubble } from '../message-bubble/MessageBubble.js';

import styles from './MessageEntry.scss';

export function MessageEntry({ message }: Readonly<{ message: Message }>) {
  return (
    <li
      key={`${message.timestamp}${message.sender}`}
      className={buildClassName(
        styles['message-entry'],
        styles[`message-entry__${message.sender}`],
      )}
    >
      <div className={styles['message-entry--avatar']}>
        {message.sender === 'assistant' && <Avatar icon={<CliptonicLogo />} />}
      </div>
      <div className={styles['message-entry--bubble']}>
        <MessageBubble message={message} />
        <p className={styles['message-entry--time']}>
          <time dateTime={message.timestamp.toISOString()}>
            {message.timestamp.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        </p>
      </div>
    </li>
  );
}

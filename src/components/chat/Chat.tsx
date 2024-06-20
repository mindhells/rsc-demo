import { sendMessage } from '../../actions/sendMessage.action.js';
import type { createGlobalContext } from '../../server/createGlobalContext.js';
import { getContext } from '../../server/withContext.js';
import { MessageEntry } from '../message-entry/MessageEntry.js';
import ChatForm from './ChatForm.client.js';

import styles from './Chat.scss';

async function Chat() {
  const { chatModel } =
    getContext<ReturnType<typeof createGlobalContext>>() || {};
  const messages = await chatModel?.getHistory();

  return (
    <div className={styles.chat}>
      <ul className={styles['chat--history']}>
        {messages?.map((message) => (
          <MessageEntry
            key={`${message.timestamp}${message.sender}`}
            message={message}
          />
        ))}
      </ul>
      <ChatForm action={sendMessage} />
    </div>
  );
}

export default Chat;

import { sendMessage } from '../../actions/sendMessage.action.js';
import type { createGlobalContext } from '../../server/createGlobalContext.js';
import { getContext } from '../../server/withContext.js';
import { MessageEntry } from '../message-entry/MessageEntry.js';
import ChatForm from './ChatForm.client.js';

import styles from './Chat.scss';

const COMPONENT_NAME = 'chat';

async function Chat() {
  const { chatModel } =
    getContext<ReturnType<typeof createGlobalContext>>() || {};
  const messages = await chatModel?.getHistory();

  return (
    <div className={styles[COMPONENT_NAME]}>
      <ul className={styles[`${COMPONENT_NAME}__list`]}>
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

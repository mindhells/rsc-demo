import { sendMessage } from '../../actions/sendMessage.action.js';
import type { createGlobalContext } from '../../server/createGlobalContext.js';
import { getContext } from '../../server/withContext.js';

import styles from './Chat.scss';
import ChatThread from './ChatThread.client.js';

const COMPONENT_NAME = 'chat';

async function Chat() {
  const { chatModel } =
    getContext<ReturnType<typeof createGlobalContext>>() || {};
  const messages = await chatModel?.getHistory();

  return (
    <div className={styles[COMPONENT_NAME]}>
      <ChatThread
        className={styles[`${COMPONENT_NAME}__list`]}
        action={sendMessage}
        messages={messages}
      />
    </div>
  );
}

export default Chat;

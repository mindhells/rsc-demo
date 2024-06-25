import { sendMessage } from '../../actions/sendMessage.action.js';
import type { createGlobalContext } from '../../server/createGlobalContext.js';
import { getContext } from '../../server/withContext.js';
import { buildClassName } from '../../utils/buildClassName.js';
import { ChatHeader } from './ChatHeader.js';

import styles from './Chat.scss';
import ChatThread from './ChatThread.client.js';

const COMPONENT_NAME = 'chat';

export type ChatProps = {
  type?: 'floating';
};

async function Chat({type}: ChatProps) {
  const { chatModel } =
    getContext<ReturnType<typeof createGlobalContext>>() || {};
  const messages = await chatModel?.getHistory();

  return (
    <div
      className={buildClassName(
        styles[COMPONENT_NAME],
        styles[`${COMPONENT_NAME}--${type}`],
      )}
    >
      <ChatHeader className={styles[`${COMPONENT_NAME}__header`]} />
      <ChatThread
        className={styles[`${COMPONENT_NAME}__thread`]}
        action={sendMessage}
        messages={messages}
      />
    </div>
  );
}

export default Chat;

import ChatForm from './ChatForm.client.js';
import { sendMessage } from '../actions/sendMessage.action.js';
import { getContext } from '../server/withContext.js';
import type { createGlobalContext } from '../server/createGlobalContext.js';

const Chat = async () => {
  const { chatModel } =
    getContext<ReturnType<typeof createGlobalContext>>() || {};
  const messages = await chatModel?.getHistory();
  return (
    <>
      <ul>
        {messages?.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
      <ChatForm action={sendMessage} />
    </>
  );
};

export default Chat;

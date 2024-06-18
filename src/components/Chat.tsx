import { appContextStore } from '../appContextStore.js';
import ChatForm from './ChatForm.client.js';
import { sendMessage } from '../actions/sendMessage.action.js';

const Chat = async () => {
  const { chatModel } = appContextStore.getStore() || {};
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

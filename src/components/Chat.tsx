import { appContextStore } from '../appContextStore.js';

const Chat = async () => {
  const { chatModel } = appContextStore.getStore() || {};
  const messages = await chatModel?.getHistory();
  return (
    <ul>
      {messages?.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
};

export default Chat;

'use client';

import { useEffect, useOptimistic, useRef, useState } from 'react';
import type { sendMessage } from '../../actions/sendMessage.action.js';
import type { MessagePayload } from '../../model/Message.js';
import { MessageEntry } from '../message-entry/MessageEntry.js';
import ChatForm from './ChatForm.client.js';

function ChatThread({
  action,
  messages: originalMessages,
  className,
}: Readonly<{
  action: typeof sendMessage;
  messages: MessagePayload[];
  className?: string;
}>) {
  const [messages, setMessages] = useState<MessagePayload[]>(originalMessages);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: MessagePayload) => [
      ...state,
      {
        pending: true,
        sender: newMessage.sender,
        text: newMessage.text,
        timestamp: newMessage.timestamp,
      },
    ],
  );
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef?.current) {
      listRef.current.addEventListener('DOMNodeInserted', (event) => {
        listRef.current?.scroll({
          top: listRef.current.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, []);

  return (
    <>
      <ul className={className} ref={listRef}>
        {optimisticMessages.map((message) => (
          <MessageEntry
            key={`${message.timestamp}${message.sender}`}
            message={message}
          />
        ))}
      </ul>
      <ChatForm
        action={action}
        questionSent={(message) => {
          addOptimisticMessage(message);
          setTimeout(() => {
            addOptimisticMessage({
              sender: 'assistant',
              text: 'Getting your answer',
              pending: true,
            });
          }, 500);
        }}
        answerReceived={(newMessages) =>
          setMessages(messages.concat(newMessages))
        }
        errorReceived={(error) => console.error(error)}
      />
    </>
  );
}

export default ChatThread;

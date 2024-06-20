'use client';

import { useTransition } from 'react';
import type { sendMessage } from '../../actions/sendMessage.action.js';
import { CliptonicLogo } from '../icons/CliptonicLogo.js';
import { SendButton } from '../send-button/SendButton.js';
import type { MessagePayload } from '../../model/Message.js';

import styles from './ChatForm.scss';

const COMPONENT_NAME = 'chat-form';

function ChatForm({
  action,
  questionSent,
  answerReceived,
  errorReceived,
}: {
  action: typeof sendMessage;
  questionSent: (message: MessagePayload) => void;
  answerReceived: (messages: MessagePayload[]) => void;
  errorReceived: (error: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const submitAction = async (formData) => {
    startTransition(async () => {
      const questionMessage: MessagePayload = {
        sender: 'user',
        text: formData.get('message') as string,
      };
      questionSent(questionMessage);
      const result = await action(undefined, formData);
      if (result.status === 'error') {
        errorReceived(result.error);
      } else if (result.status === 'success') {
        answerReceived(result.messages);
      }
    });
  };

  return (
    <div className={styles[COMPONENT_NAME]}>
      <form action={submitAction} className={styles[`${COMPONENT_NAME}__form`]}>
        <CliptonicLogo />
        <input
          className={styles[`${COMPONENT_NAME}__input`]}
          type="text"
          name="message"
          autoComplete="off"
          required
        />
        <SendButton disabled={isPending} />
      </form>
    </div>
  );
}

export default ChatForm;

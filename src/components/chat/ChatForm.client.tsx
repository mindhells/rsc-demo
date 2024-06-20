'use client';

import { useActionState } from 'react';
import type { sendMessage } from '../../actions/sendMessage.action.js';
import { CliptonicLogo } from '../icons/CliptonicLogo.js';
import { SendButton } from '../send-button/SendButton.js';

import styles from './ChatForm.scss';

const COMPONENT_NAME = 'chat-form';

function ChatForm({ action }: { action: typeof sendMessage }) {
  const [formState, formAction, isPending] = useActionState(action, {});

  return (
    <div className={styles[COMPONENT_NAME]}>
      <form action={formAction} className={styles[`${COMPONENT_NAME}__form`]}>
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
      <div>{formState.status === 'error' && <p>{formState.error}</p>}</div>
    </div>
  );
}

export default ChatForm;

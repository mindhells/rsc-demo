'use client';

import { useActionState } from 'react';
import type { sendMessage } from '../../actions/sendMessage.action.js';
import { CliptonicLogo } from '../icons/CliptonicLogo.js';
import { SendButton } from '../send-button/SendButton.js';

import styles from './Chat.scss';

function ChatForm({ action }: { action: typeof sendMessage }) {
  const [formState, formAction, isPending] = useActionState(action, {});

  return (
    <>
      <form action={formAction} className={styles['chat--search']}>
        <CliptonicLogo className={styles['chat--avatar']} />
        <input
          className={styles['chat--input']}
          type="text"
          name="message"
          required
        />
        <SendButton disabled={isPending} />
      </form>
      <div>{formState.status === 'error' && <p>{formState.error}</p>}</div>
    </>
  );
}

export default ChatForm;

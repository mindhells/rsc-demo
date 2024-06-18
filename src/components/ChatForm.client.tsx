'use client';

import { useActionState } from 'react';
import type { sendMessage } from '../actions/sendMessage.action.js';

function ChatForm({ action }: { action: typeof sendMessage }) {
  const [formState, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction}>
      <label>
        Message:
        <input type="text" name="message" />
      </label>
      <button type="submit">{isPending ? 'Sending...' : 'Send'}</button>
      {formState.status === 'error' ? <p>{formState.error}</p> : null}
      {formState.status === 'success' ? <p>{formState.answer}</p> : null}
    </form>
  );
}

export default ChatForm;

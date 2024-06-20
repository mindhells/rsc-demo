'use server';

import type { MessagePayload } from '../model/Message.js';
import type { createGlobalContext } from '../server/createGlobalContext.js';
import { getContext } from '../server/withContext.js';

export type SendMessageResponse =
  | {
      status: 'success';
      messages: MessagePayload[];
    }
  | {
      status: 'error';
      error: string;
    };

export async function sendMessage(
  previousState,
  formData,
): Promise<SendMessageResponse> {
  const { chatModel } = getContext<ReturnType<typeof createGlobalContext>>();
  const question = formData.get('message');
  try {
    const messages = await chatModel.ask(question);
    return {
      status: 'success',
      messages: messages.map((item) => item.toJSON()),
    };
  } catch (_error) {
    return { status: 'error', error: 'Error getting your answer' };
  }
}

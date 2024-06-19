'use server';

import type { createGlobalContext } from '../server/createGlobalContext.js';
import { getContext } from '../server/withContext.js';

export async function sendMessage(previousState, formData) {
  const { chatModel } =
    getContext<ReturnType<typeof createGlobalContext>>() || {};

  const message = formData.get('message');
  try {
    const answer = await chatModel?.ask(message);
    return { status: 'success', answer };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
}

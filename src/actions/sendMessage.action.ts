'use server';

import { appContextStore } from '../appContextStore.js';

export async function sendMessage(previousState, formData) {
  const { chatModel } = appContextStore.getStore() || {};

  const message = formData.get('message');
  try {
    const answer = await chatModel?.ask(message);
    return { status: 'success', answer };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
}
